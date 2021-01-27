import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map,tileLayer,marker } from 'leaflet';
import { MAP_URL } from 'src/environments/config'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input()
  ubicacion;

  map: Map;


  constructor(private router: Router) { }

  ngOnInit() {
    this.loadMap();
   }

  
  loadMap(){
    this.map = new Map('mapId');

    /*const position = await this.locationService.getLocation();
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;*/

    this.map.setView([this.ubicacion.coordinates[0], this.ubicacion.coordinates[1]], 16)
    tileLayer(MAP_URL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlja3lwdXNwYSIsImEiOiJja2s4dnNnc3cwNzEzMnBwYmptcGRlZjVyIn0.gTTzVoYPCbFYJYVh8_Spdg'
      }).addTo(this.map);
      let popup = '<b> ' + this.ubicacion.name + '</b><br> Aquí se juega tu torneo'
    marker([this.ubicacion.coordinates[0], this.ubicacion.coordinates[1]]).addTo(this.map).bindPopup(popup).openPopup();

    console.log("mapa: " , this.map);
  }

}
