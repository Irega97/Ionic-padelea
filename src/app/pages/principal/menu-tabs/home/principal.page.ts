import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { EventsService } from 'src/app/services/events.service';
import { MenuController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ComponentsService } from 'src/app/services/components.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import * as moment from 'moment';

import {Map,tileLayer,marker } from 'leaflet';
import { MAP_URL } from 'src/environments/config'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/services/location.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  numNotificaciones: number = 0;
  publicationForm: FormGroup;
  pulsado: boolean;
  publicaciones: any;

  map: Map;
  distance: string;
  lat: number;
  lng: number;
  nearTorneos: any;
  platform: any;
  ruta = environment.apiURL + "/torneo/";

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: EventsService, private publiService: PublicacionesService, private torneoService: TorneoService,
    private notificationsService: NotificationsService, private menu: MenuController, private formBuilder: FormBuilder, private components: ComponentsService, private http: HttpClient, private location: LocationService) { 
  }

  ngOnInit() {
    moment.locale('es');
    if (this.userService.user != undefined){
      this.usuario = this.userService.user;
      this.notificationsService.getMyNotifications(true).subscribe(data =>{
        this.numNotificaciones = data.length;
      });
    }

    this.torneosNearU();

    this.publiService.getHomePublications().subscribe((data: any) => {
      console.log("chuli i love u: ", data);
      this.publicaciones = data;
      this.publicaciones.forEach((publi) => {
        this.publicaciones[this.publicaciones.indexOf(publi)].date = this.getMoment(publi);
      })
    })

    this.publicationForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
        this.notificationsService.getMyNotifications(true).subscribe(data =>{
          this.numNotificaciones = data.length;
        });
      }

      else if (data.topic == "nuevaNotificacion"){
        this.numNotificaciones++;
      }

      else if (data.topic == "deleteNotification"){
        this.numNotificaciones--;
      }

      else if (data.topic == "newPost"){
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

  ionViewWillLeave(){
    this.menu.close('first');
  }

  logout(){
    this.authService.signout().subscribe(() =>{
      this.events.publish({
        "topic":"disconnectUser",
        "user": this.userService.user
      })
      this.userService.user = undefined;
      this.userService.i = 0;
      this.events.disconnectSocket();
      this.menu.close('first');
      this.router.navigate(['/auth/login']);
    })
  }

  goPerfil(){
    this.menu.close('first');
    this.router.navigate(['/user/' + this.userService.user.username]);
  }

  goTorneos(){
    this.menu.close('first');
    this.router.navigate(['/user/' + this.userService.user.username + '/torneos']);
  }
  /*
  goPartidos(){
    this.menu.close('first');
  }*/

  goAmigos(){
    this.menu.close('first');
    this.router.navigate(['/user/' + this.userService.user.username + '/amigos']);
  }

  goInfo(){
    this.menu.close('first');
    this.router.navigate(['/principal/sobrenosotros']);
  }

  goNotificaciones(){
    this.menu.close('first');
    let navigationExtras: NavigationExtras = {
      state: {
        notifications: this.usuario.notifications
      }
    };
    this.router.navigate(['/principal/notificaciones'], navigationExtras);
  }

  newPost(){
    this.pulsado = true;
    if (this.publicationForm.invalid){
      return;
    }
    
    let mensaje = this.publicationForm.value.message;
    console.log("enviaria esto: ", mensaje);
    this.publicationForm.get('message').setValue('');
    this.components.presentLoading("Conectando...").then(() => {
      this.publiService.postPublication({mensaje: mensaje}).subscribe((data: any) => {
        this.events.publish({
          "topic":"newPost",
          "data": data
        })
        this.components.dismissLoading();
      }, error => {
        this.components.presentAlert(error.error.message);
      });
    });
    this.pulsado = false;
    this.publicationForm.reset();
  }
  
  async torneosNearU(){
    const position = await this.location.getLocation();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    let body = {
      "lat": this.lat,
      "lng": this.lng
    }
    this.torneoService.getTorneosNearU(body).subscribe((data) => {
      this.nearTorneos = data;
    })
  }

  goTorneo(name: string){
    this.router.navigateByUrl('/torneo/'+name+'/home');
  }

  getMoment(publi){
    let day: Date = new Date(publi.date);
    return moment(day, "YYYYMMDD, h:mm").startOf('minute').fromNow();;
  }
}
