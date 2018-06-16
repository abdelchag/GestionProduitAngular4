import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class TestService {

  constructor(public http: Http) { }

  downloadFile() : Observable<any> {
    return this.http.get('http://localhost:8080/fileapi/download');
  }

}
