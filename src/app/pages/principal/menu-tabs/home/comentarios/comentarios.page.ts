import { Component, OnInit } from '@angular/core';
import {PublicacionesService} from '../../../../../services/publicaciones.service';
import {Router,ActivatedRoute} from '@angular/router';
import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  id: string;
  comentarios: any = [];
  message = "";
  
  constructor(private publicacionesService: PublicacionesService, private router: ActivatedRoute, private events: EventsService){}

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.publicacionesService.getComments(this.id).subscribe(data => {
        this.comentarios = data.comments;
      });     
    });
  
    this.events.getObservable().subscribe(data => {
      if (data.topic == "nuevoComentario"){
        if (data.publicacion == this.id){
          this.comentarios.push(data.comentario);
        }
      }
    })
  }

  enviarComment(event){
    if (event.keyCode == 13) {
      event.preventDefault();
      this.sendComment();
    }
  };

  sendComment(){
    if (this.message != ""){
      let info = {
        publicacion: this.id,
        comentario : this.message
      }

      this.publicacionesService.addComment(info).subscribe(data => {
        console.log("Data", data);
        this.message = "";
      })
    } 
  }

  



}

