import { Component, OnInit } from '@angular/core';
import {Produit} from "../produit.model";
import {MyObject} from "../my-object";
import {TestService} from "../test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  produits : Produit[];
  anyObject : MyObject[];
  selectedValue: Produit;
  selectedAny : MyObject;

  constructor(private service : TestService) { }

  ngOnInit() {
    let p1 : Produit = new Produit();
    p1.id = 1; p1.designation = "Des1", p1.prix = 20, p1.quantite = 300;
    let p2 : Produit = new Produit();
    p2.id = 1; p2.designation = "Des2", p2.prix = 20, p2.quantite = 300;
    let p3 : Produit = new Produit();
    p3.id = 1; p3.designation = "Des3", p3.prix = 20, p3.quantite = 300;
    let p4 : Produit = new Produit();
    p4.id = 4; p4.designation = "Des4", p4.prix = 20, p4.quantite = 300;
    this.produits = [
      p1, p2, p3, p4
    ];

    let m1 = new MyObject();
    m1.id = 1; m1.libelle="libe1";

    let m2 = new MyObject();
    m2.id = 2; m2.libelle="libe2";

    let m3 = new MyObject();
    m3.id = 3; m3.libelle="libe3";


    this.anyObject = [
      m1, m2, m3
    ];

    this.selectedValue = p3;
    this.selectedAny = m2;

    console.log(this.produits);
    console.log(this.selectedValue);

  }

  showConsole() {
    console.log(this.selectedValue.id);
  }

  compare(p1 : Produit, p2: Produit) : boolean{
    return p1.id === p2.id && p1.designation === p2.designation;
  }

  compareAny(a1 : any, a2: any) : boolean{
    return a1.id === a2.id;
  }

  compareAll(a1 : Object, a2 : Object): boolean{
    if(a1 instanceof Produit && a2 instanceof Produit){
      console.log("Prod");
      let p1 : Produit = a1 as Produit;
      let p2 : Produit = a1 as Produit;
      return this.compare(p1, p2);
    }else if(a1 instanceof MyObject && a2 instanceof MyObject){
      console.log("Objec");
      return this.compareAny(a1 as MyObject, a2 as MyObject);
    }
  }

  downloadFile(){
    console.log("DOWNLOADING ...");
    this.service.downloadFile().subscribe(res => {
      console.log(res);
      var blob = new Blob([res._body], { type: 'application/octet-stream' });
      var url= window.URL.createObjectURL(blob);
      //JS
      /*var anchor = document.createElement("a");
      anchor.download = "test.txt";
      anchor.href = url;
      anchor.click();*/
      //ANGULAR 2
      window.open(url);


    }, err => {
      console.log("Error");
      console.log(err);
    });
    console.log("Finish ...");
  }

}
