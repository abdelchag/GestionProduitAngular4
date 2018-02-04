import { Component, OnInit } from '@angular/core';
import {Produit} from "../produit.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitService} from "../produit.service";

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  private produit:Produit;
  private id:number;
  private param:any;

  constructor(private route:ActivatedRoute, private service:ProduitService, private router:Router) { }

  ngOnInit() {
    this.produit = new Produit();
    this.param = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getSelectedProduit();
    console.log('affich : ' + this.produit.json());
  }

  getSelectedProduit(){
    this.service.getProduitById(this.id).subscribe(
      res =>
        this.produit = res
      );
  }

  modifierProduit(){
    console.log(this.produit);
    this.service.updateById(this.produit).subscribe(
      res => {
        this.produit = res;
        alert('Le produit ref : ' + this.produit.id + " est modifié avec succès");
        this.router.navigate(['chercher']);
      },
      err => console.log('erreur : ' + err.data.status + ' : ' + err.data.exception + ' -> ' + err.data.message)
    )
  }

}
