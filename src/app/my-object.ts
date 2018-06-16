export class MyObject {

  private _id : number;
  private _libelle : string;


  set id(value: number) {
    this._id = value;
  }

  set libelle(value: string) {
    this._libelle = value;
  }

  get id(): number {
    return this._id;
  }

  get libelle(): string {
    return this._libelle;
  }
}
