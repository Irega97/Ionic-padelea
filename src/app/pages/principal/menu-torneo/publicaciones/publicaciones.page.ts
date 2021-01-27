import { TorneoService } from 'src/app/services/torneo.service';
import { EventsService } from 'src/app/services/events.service';
import { ComponentsService } from './../../../../services/components.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {

  publicationForm: FormGroup;
  publicaciones: any = [];
  name: string;
  pulsado;
  torneoID;
  isAdmin;

  constructor(private publiService: PublicacionesService, private torneoService: TorneoService, private router: Router, private formBuilder: FormBuilder, private components: ComponentsService, private events: EventsService) { }

  ngOnInit() {
    moment.locale('es');
    this.name = this.router.url.split('/')[2];
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }

    if(this.name != undefined) {
      this.torneoService.getTorneo(this.name).subscribe((data) => {
        this.torneoID = data.torneo._id;
        this.isAdmin = data.isAdmin;
      })
      this.publiService.getPublicationsTorneo(this.name).subscribe((data: any) => {
        console.log(data);
        this.publicaciones = data.publicaciones;
        this.publicaciones.forEach((publi) => {
          this.publicaciones[this.publicaciones.indexOf(publi)].date = this.getMoment(publi);
          console.log("Publis: ", this.publicaciones.date);
        });
      });
    }

    this.publicationForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "newPost"){
        console.log("refresh: ", data.data);
        data.data.date = this.getMoment(data.data);
        this.publicaciones.unshift(data.data);
      }
    });
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.publicationForm.reset();
  }

  getMoment(publi){
    let day: Date = new Date(publi.date);
    return moment(day, "YYYYMMDD, h:mm").startOf('minute').fromNow();;
  }

  newPost(){
    this.pulsado = true;
    if (this.publicationForm.invalid){
      return;
    }
    
    let mensaje = this.publicationForm.value.message;
    this.publicationForm.get('message').setValue('');
    console.log(this.torneoID + "jajajaja");
    let body = {
      mensaje: mensaje,
      isTorneo: true,
      torneo: this.torneoID
    };
    this.components.presentLoading("Conectando...").then(() => {
      this.publiService.postPublication(body).subscribe((data: any) => {
        this.events.publish({
          "topic":"newPost",
          "data": data
        })
        this.components.dismissLoading();
      }, error => {
        this.components.dismissLoading();
        this.components.presentAlert(error.error.message);
      });
    });
    this.pulsado = false;
    this.publicationForm.reset();
  }

}
