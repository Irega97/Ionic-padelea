import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service'
import { MAP_URL } from 'src/environments/config';
//import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";


@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage {

  map:Map;
  newMarker:any;
  address:string[];
  lat: number;
  lng: number;
  
constructor(private router:Router, private locationService: LocationService /*private geocoder:NativeGeocoder*/) { }
  
  // The below function is added
  ionViewDidEnter(){
    this.loadMap();
  }
 // The below function is added
 async loadMap(){
  this.map = new Map("mapId");
  const position = await this.locationService.getLocation();
  this.lat = position.coords.latitude;
  this.lng = position.coords.longitude;
  this.map.setView([this.lat, this.lng], 11)
  /*tileLayer(MAP_URL, {
    attribution: 'edupala.com © ionic LeafLet',
  }).addTo(this.map);*/
  tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>'}).addTo(this.map);
}

locatePosition() {
  this.map.locate({ setView: true }).on("locationfound", (e: any) => {
    this.newMarker = marker([e.latitude, e.longitude], {
      draggable: true
    }).addTo(this.map);
    this.newMarker.bindPopup("You are located here!").openPopup();
    //this.getAddress(e.latitude, e.longitude); 
 
    this.newMarker.on("dragend", () => {
      const position = this.newMarker.getLatLng();
      //this.getAddress(position.lat, position.lng);
     
    });
  });
}
/*
getAddress(lat: number, long: number) {
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  this.geocoder.reverseGeocode(lat, long, options).then(results => {
    this.address = Object.values(results[0]).reverse();
    
  });
}*/

goBack(){
  this.router.navigate(["home"]);
}
}
