import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Produit} from "./produit.model";
import { Observable } from 'rxjs';

@Injectable()
export class ProduitService {

  constructor(public http: Http) { }

  getAllProduits(designation:string, currentPage:number, size:number): Observable<any>{
    return this.http.get('http://localhost:8080/chercher?design=' + designation + '&page=' + currentPage + '&size=' + size)
      .map(res => res.json())
      ._catch(this.handleError);

  }

  enregistrerProduit(produit:Produit): Observable<Produit>{
    return this.http.post('http://localhost:8080/produits',produit.json())
      .map(res => res.json());
  }

  supprimerProduit(id:number) : Observable<void> {
    return this.http.delete('http://localhost:8080/produits/' + id).map(res => {});
  }

  getProduitById(id:number) : Observable<Produit>{
    return this.http.get('http://localhost:8080/produits/' + id).map(res => res.json())
  }

  updateById(produit:Produit) : Observable<Produit>{
    return this.http.put('http://localhost:8080/produits/' + produit.id, produit)
      .map(res => res.json())
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.of(error);
  }


}
