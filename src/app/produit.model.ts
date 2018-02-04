export class Produit {

  private _id : number;
  private _designation : string;
  private _prix : number;
  private _quantite : number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get designation(): string {
    return this._designation;
  }

  set designation(value: string) {
    this._designation = value;
  }

  get prix(): number {
    return this._prix;
  }

  set prix(value: number) {
    this._prix = value;
  }

  get quantite(): number {
    return this._quantite;
  }

  set quantite(value: number) {
    this._quantite = value;
  }

  json() {
    return {designation:this.designation,prix:this.prix,quantite:this.quantite};
  }

}
