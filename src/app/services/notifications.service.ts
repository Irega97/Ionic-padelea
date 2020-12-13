import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  ruta = environment.apiURL + "/notifications/"
  constructor(private http: HttpClient) { }

  getNumberNotifications(): Observable<any>{
    return this.http.get<any>(this.ruta + "all");
  }
}
