import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor() { }

  private dataSubject = new Subject<any>();

  public publish(data: any) {
    this.dataSubject.next(data);
  }

  public getObservable(): Subject<any> {
    return this.dataSubject;
  }
}