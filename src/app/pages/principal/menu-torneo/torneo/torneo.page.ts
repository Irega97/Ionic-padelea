import { EventsService } from '../../../../services/events.service';
import { ComponentsService } from '../../../../services/components.service';
import { Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker } from 'leaflet';
import { MAP_URL } from 'src/environments/config'
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { Socket } from 'ngx-socket-io';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {

  torneo;
  name;
  isAdmin;
  players;
  joined: boolean;
  fechaInicio;
  finInscripcion;
  ubicacion;
  cola: Boolean = false;

  map: Map;
  lat: number;
  lng: number;
  
  constructor(private torneoService: TorneoService, private router: Router, private component: ComponentsService, 
              private events: EventsService, private userService: UserService, private socket: Socket, private locationService: LocationService, private plt: Platform,) { }

  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }

    this.torneoService.getTorneo(this.name).subscribe(data =>{
      this.isAdmin = data.isAdmin;
      this.joined = data.joined;
      this.torneo = data.torneo;
      this.players = data.torneo.players;
      this.fechaInicio = new Date(this.torneo.fechaInicio);
      this.fechaInicio = this.fechaInicio.toLocaleString().split(' ');
      this.finInscripcion = new Date(this.torneo.finInscripcion);
      this.finInscripcion = this.finInscripcion.toLocaleString().split(' ');
      this.ubicacion = data.torneo.ubicacion;
      console.log(this.ubicacion);
      this.torneo.cola.forEach(cola => {
        if (cola == this.userService.user._id)  
          this.cola = true;
      });
    });
  
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "nuevoJugador" && data.jugador.torneo == this.name){
        this.players.push(data.jugador);
      } 
      
      else if (data.topic == "player-left" && data.jugador.torneo == this.name){
        this.players.forEach(player =>{
          if(player.username == data.jugador.username){
            let i = this.players.indexOf(player);
            this.players.splice(i, 1);
          }
        });
      }
    });

    this.socket.on('aceptadoCola', torneo => {
      if (this.name == torneo)
        this.joined = true;
    });

    this.socket.on('rechazadoCola', torneo => {
      if (this.name == torneo)
        this.cola = false;
    });
  }
  
  
  ionViewDidEnter() {
    this.plt.ready().then(() => {
      this.loadMap();
    });
  }
  
  /*
  ngAfterViewInit() {
    if(this.ubicacion != null) this.loadMap();
  }*/

  loadMap(){
    this.map = new Map('mapId').setView([this.ubicacion.lat, this.ubicacion.lng], 16);

    /*const position = await this.locationService.getLocation();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;*/

    this.map.setView([this.ubicacion.lat, this.ubicacion.lng], 16)
    tileLayer(MAP_URL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlja3lwdXNwYSIsImEiOiJja2s4dnNnc3cwNzEzMnBwYmptcGRlZjVyIn0.gTTzVoYPCbFYJYVh8_Spdg'
      }).addTo(this.map);
      let popup = '<b> ' + this.ubicacion.name + '</b><br> Aquí se juega tu torneo'
    marker([this.ubicacion.lat, this.ubicacion.lng]).addTo(this.map).bindPopup(popup).openPopup();
  }

  joinTorneo(){
    this.torneoService.joinTorneo(this.name).subscribe((data) => {
      this.component.presentAlert(data.message);
      if (this.torneo.type == "public" && Date.parse(this.torneo.finInscripcion.toString()) > Date.now())
        this.joined = true;

      else{
        this.cola = true;
      }

    }, (response)=>{
      console.log("error: ", response);
      this.component.presentAlert(response.error.message);
    })
  }

  leaveTorneo(){
    this.torneoService.leaveTorneo(this.name).subscribe((data) => {
      this.component.presentAlert(data.message);
      
      this.joined = false;
    }, (error) => {
      console.log(error);
      this.component.presentAlert(error.error.message);
    })
  }
}
