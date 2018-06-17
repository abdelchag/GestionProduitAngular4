import { Component, OnInit } from '@angular/core';
import {Produit} from "../produit.model";
import {ProduitService} from "../produit.service";

@Component({
  selector: 'app-chercher',
  templateUrl: './chercher.component.html',
  styleUrls: ['./chercher.component.css']
})
export class ChercherComponent implements OnInit {

  private total:number;
  private pages:number[];
  private produits: Produit[];
  private designation:string;
  private currentPage:number;
  private size:number;
  private nbrElements;


  constructor(private service: ProduitService) {
    this.designation = "";
    this.size = 3;
    this.currentPage = 0;
    this.nbrElements = 0;
  }

  ngOnInit() {
    this.chercher();
    this.currentPage = 0;
  }

  chercher(){
    console.log("chercher");
    this.service.getAllProduits(this.designation, this.currentPage, this.size).subscribe(
      res => {
        console.log(res);
        this.total = res.totalPages;
        this.produits = res.content;
        this.pages = new Array(this.total);
        this.nbrElements = res.numberOfElements;
        if(this.nbrElements == 0 && this.currentPage > 0){
          this.currentPage = this.currentPage - 1;
          this.chercher();
        }
      }
    )
  }

  filtrer(){
    console.log("filter");
    this.chercher();
    this.currentPage = 0;
  }

  gotoPage(p:number) {
    console.log("lancer");
    this.currentPage = p;
    this.chercher();
  }

  supprimer(produit:Produit){
    console.log("Supprimer : " + produit.id);
    this.service.supprimerProduit(produit.id).subscribe(
      res => {
        alert('Le produit ' + produit.designation + ' ref : ' + produit.id + ' est supprimer');
        this.chercher();
      },
      err => alert('Problème de suppression !!'));
  }

}
