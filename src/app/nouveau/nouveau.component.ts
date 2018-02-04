import { Component, OnInit } from '@angular/core';
import {Produit} from "../produit.model";
import {ProduitService} from "../produit.service";

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.css']
})
export class NouveauComponent implements OnInit {

  private designation:string;
  private prix:number;
  private quantite:number;
  private produit:Produit;
  private mode:number;

  constructor(private service: ProduitService) { }

  ngOnInit() {
    this.mode = 0;
    this.produit = new Produit();
    console.log("hna");
  }

  saveProduit(){
    console.log("save");
    console.log(this.produit);
    this.service.enregistrerProduit(this.produit).subscribe(res => {
      this.produit = res;
      this.mode = 1;
    })
  }

  modeNew(){
    this.produit = new Produit();
    console.log("modeNew");
    this.mode = 0;
  }

}
