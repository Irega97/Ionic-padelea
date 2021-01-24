import { EventsService } from '../../../../services/events.service';
import { ComponentsService } from '../../../../services/components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {Map,tileLayer,marker } from 'leaflet';
import { lat, lng } from 'src/environments/config'
import { LocationService } from 'src/app/services/location.service';

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

  map: Map;
  lat: number;
  lng: number;
  
  constructor(private torneoService: TorneoService, private route: ActivatedRoute, private component: ComponentsService, 
              private events: EventsService, private router: Router, private adminService: AdminService, private locationService: LocationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
      this.adminService.setName(this.name)
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

      this.loadMap();
      });
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "nuevoJugador" && data.jugador.torneo == this.name){
        this.players.push(data.jugador);
      } 
      
      else if (data.topic == "player-left" && data.jugador.torneo == this.name){
        this.torneoService.getTorneo(this.name).subscribe(data => {
          this.players = data.torneo.players;
        })
        /*this.players = this.players.filter(player =>{
          if(player.username == data.jugador.username){
            let i = this.players.indexOf(player);
            this.players.splice(i, 1);
          }
        })*/
      }
    });
  }
  
  ionViewDidEnter(){ 
  }

  loadMap(){
  //async loadMap(){
    this.map = new Map('mapId');
    /*const position = await this.locationService.getLocation();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;*/

    this.map.setView([lat, lng], 16)
    tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlja3lwdXNwYSIsImEiOiJja2s4dnNnc3cwNzEzMnBwYmptcGRlZjVyIn0.gTTzVoYPCbFYJYVh8_Spdg'
      }).addTo(this.map);

    marker([41.28419741151979, 1.9944762978072328]).addTo(this.map).bindPopup('<b>PADELARIUM GAVÀ</b><br> Aquí se juega tu torneo').openPopup();
  }

  joinTorneo(){
    this.torneoService.joinTorneo(this.name).subscribe((data) => {
      this.component.presentAlert(data.message);
      this.joined = true;
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
