import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { Router } from '@angular/router';
import * as L from 'leaflet';
@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage {

  map:Map;
  newMarker:any;
  address:string[];
constructor(private router:Router) { }
  
  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
  }
 // The below function is added
  loadMap(){
      this.map = new Map("mapId").setView([17.3850,78.4867], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token'
        }).addTo(this.map);
      }

  goBack(){
    this.router.navigate(["home"]);
  }
}
