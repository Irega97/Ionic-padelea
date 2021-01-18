import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { Router } from '@angular/router';
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
/*tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      contributors, 
     <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- 
     SA</a>'})
    .addTo(this.map); // This line is added to add the Tile Layer to our map*/
  }
  goBack(){
    this.router.navigate(["home"]);
  }
}
