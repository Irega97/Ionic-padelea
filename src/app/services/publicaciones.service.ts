import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  ruta = environment.apiURL + "/publicaciones/"
  constructor(private http: HttpClient) { }

  postPublication(body: any) {
    return this.http.post(this.ruta + 'new', body);
  };

  getPublicationsUser(username: string) {
    return this.http.get(this.ruta + 'user/' + username);
  }

  getPublicationsTorneo(name: string) {
    return this.http.get(this.ruta + 'torneo/' + name);
  }

  getHomePublications() {
    return this.http.get(this.ruta + 'all');
  }

  likePubli(publiID: string){
    return this.http.post(this.ruta + 'like', {publicacion: publiID});
  }
  
  addComment(body: any){
    return this.http.post(this.ruta + 'comment', body);
  }

  getComments(publiID: string): Observable<any>{
    return this.http.post<any>(this.ruta + 'comments/all', {publicacion: publiID})
  }
}
