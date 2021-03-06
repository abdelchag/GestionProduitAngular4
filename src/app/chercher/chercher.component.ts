import {Component, OnInit, ViewChild} from '@angular/core';
import {Produit} from "../produit.model";
import {ProduitService} from "../produit.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

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
  private ascDesign:boolean;
  private ascQte:boolean;
  private ascPrix:boolean;
  private dataSource : MatTableDataSource<Produit>;
  displayedColumns: string[] = ['id', 'designation', 'prix', 'quantite'];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ProduitService) {
    this.designation = "";
    this.size = 10;
    this.currentPage = 0;
    this.nbrElements = 0;
  }

  ngOnInit() {
    console.log("chercher");
    this.chercher();
    this.currentPage = 0;
    this.ascDesign = true;
    this.ascPrix = true;
    this.ascQte = true;
  }

  chercher(){
    console.log("chercher");
    this.service.getAllProduits(this.designation, this.currentPage, this.size).subscribe(
      res => {
        console.log(res);
        this.total = res.totalPages;
        this.produits = res.content;
        this.dataSource = new MatTableDataSource(this.produits);
        this.dataSource.sortingDataAccessor = (item : Produit, property : string) => {
          switch(property) {
            case 'designation': {
              if(item.designation === '')
              {
                return "zzzzzz";
              }else{
                return item.designation.toLowerCase().replace('à', 'a');
              }

            }
            default: return item[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  sortBy(sortValue: string){
    switch(sortValue){
      case 'design' :
        this.produits = this.produits.sort(this.ascDesign ? this.sortByDesignationASC : this.sortByDesignationDESC);
        this.ascDesign = !this.ascDesign;
        break;
      case 'qte' :
        this.produits = this.produits.sort(this.ascQte ? this.sortByQuantiteASC : this.sortByQuantiteDESC);
        this.ascQte = !this.ascQte;
        break;
      case 'prix' :
        this.produits = this.produits.sort(this.ascPrix ? this.sortByPrixASC : this.sortByPrixDESC);
        this.ascPrix = !this.ascPrix;
        break;

    }
  }

  sortByDesignationASC(p1 : Produit, p2 : Produit){
    if(p1.designation > p2.designation) return 1;
    else if(p1.designation === p2.designation) return 0;
    else
      return -1;
  }
  sortByDesignationDESC(p1 : Produit, p2 : Produit){
    if(p1.designation < p2.designation) return 1;
    else if(p1.designation === p2.designation) return 0;
    else
      return -1;
  }

  sortByQuantiteASC(p1 : Produit, p2 : Produit){
    if(p1.quantite > p2.quantite) return 1;
    else if(p1.quantite === p2.quantite) return 0;
    else
      return -1;
  }
  sortByQuantiteDESC(p1 : Produit, p2 : Produit){
    if(p1.quantite < p2.quantite) return 1;
    else if(p1.quantite === p2.quantite) return 0;
    else
      return -1;
  }

  sortByPrixASC(p1 : Produit, p2 : Produit){
    if(p1.prix > p2.prix) return 1;
    else if(p1.prix === p2.prix) return 0;
    else
      return -1;
  }
  sortByPrixDESC(p1 : Produit, p2 : Produit){
    if(p1.prix < p2.prix) return 1;
    else if(p1.prix === p2.prix) return 0;
    else
      return -1;
  }

  applyFilterDesign(filterValue: string) {
    this.dataSource.filterPredicate = (data : Produit, filter : string) => data.designation.indexOf(filter) != -1;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterPrix(filterValue: string) {
    this.dataSource.filterPredicate = (data : Produit, filter : string) => data.prix.toString().indexOf(filter) != -1;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
