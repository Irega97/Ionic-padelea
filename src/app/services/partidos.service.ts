import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  ruta = environment.apiURL + "/partido/"
  constructor(private http: HttpClient) { }

  getPartidosGrupo(nameTorneo: string, vuelta: string, grupo: string): Observable<any> {
    return this.http.get<any>(this.ruta + nameTorneo + "/" + vuelta + "/" + grupo);
  }

  addResultadoPartido(body: any): Observable<any> {
    return this.http.post<any>(this.ruta + 'results', body);
  }
}
