import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {PublicacionesService} from '../../../../../services/publicaciones.service';
import { ActivatedRoute } from '@angular/router';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  id: string;
  comentarios: [];
  message = "";
  
  constructor(private publicacionesService: PublicacionesService, private location: Location, private router: ActivatedRoute, private component : ComponentsService){}

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      console.log("comentario id: ", this.id);
      this.publicacionesService.getComments(this.id).subscribe(data => {
        console.log("data: ", data);
        this.comentarios = data.comments;
      });     
    });
  
  }

  enviarComment(event){
    if (event.keyCode == 13) {
      event.preventDefault();
      this.sendComment();
    }
  };

  sendComment(){
    if (this.message != ""){
      if(this.message.length < 80){
      let info = {
        publicacion: this.id,
        comentario : this.message

      }

      this.publicacionesService.addComment(info).subscribe(data => {
        console.log("Data", data);
        this.message = "";
      })}
      else(this.component.presentAlert("Máximo 80 caracteres"))
    } 
  }

  goBack(){
    this.location.back();
  }
}

