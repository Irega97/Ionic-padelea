import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  ruta = environment.apiURL + "/torneo/"
  constructor(private http: HttpClient) { }

  getTorneos(): Observable<any> {
    return this.http.get<JSON>(this.ruta + '/all');
  }
  
  getMyTorneos(): Observable<any> {
    return this.http.get<JSON>(this.ruta + '/all/me');
  }

  getTorneo(idTorneo: string): Observable<any> {
    return this.http.get<JSON>(this.ruta + idTorneo);
  }
  
  createTorneo(name: any): Observable<any> {
    // name = {"name": "krjdsgnj"}
    return this.http.post<JSON>(this.ruta + '/new', name);
  }
  
  
  joinTorneo(idTorneo: string): Observable<any> {
    return this.http.post<any>(this.ruta + 'join/' + idTorneo, null);
  }
}
