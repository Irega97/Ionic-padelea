import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor() { console.log("Funciona!!") }

  private dataSubject = new Subject<any>();

  public publish(data: any) {
    this.dataSubject.next(data);
  }

  public getObservable(): Subject<any> {
    console.log("Usuario: ", this.dataSubject);
    return this.dataSubject;
  }
}