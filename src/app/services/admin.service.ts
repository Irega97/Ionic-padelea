import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  ruta;
  constructor(private http: HttpClient) { }

  setName(name: String){
    this.ruta = environment.apiURL + '/torneo/admin/' + name + '/';
  }

  getCola(): Observable<any>{
    return this.http.get<any>(this.ruta + 'cola');
  }

  acceptPlayers(response: any): Observable<any>{
    return this.http.post<any>(this.ruta + 'cola', response);
  }

  empezarPrevia(): Observable<any>{
    return this.http.get<any>(this.ruta + 'empezarprevia');
  }

  finalizarRonda(): Observable<any>{
    return this.http.get<any>(this.ruta + 'finalizarRonda');
  }
}
