import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service'
import { MAP_URL } from 'src/environments/config';
import { ModalController } from '@ionic/angular';

//import { NativeGeocoder ,NativeGeocoderOptions} from "@ionic-native/native-geocoder";


@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage implements OnInit{

  map:Map;
  newMarker:any;
  address:string[];
  lat: number;
  lng: number;
  
constructor(private router:Router, private locationService: LocationService, public modalController: ModalController, /*private geocoder: NativeGeocoder*/ ) { }
  
ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.loadMap();
  }
  async loadMap(){
  this.map = new Map("mapId");
  const position = await this.locationService.getLocation();
  this.lat = position.coords.latitude;
  this.lng = position.coords.longitude;
  this.map.setView([this.lat, this.lng], 11)

  tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlja3lwdXNwYSIsImEiOiJja2s4dnNnc3cwNzEzMnBwYmptcGRlZjVyIn0.gTTzVoYPCbFYJYVh8_Spdg'
      }).addTo(this.map);   
  }

locatePosition() {
  this.map.locate({ setView: true }).on("locationfound", (e: any) => {
    this.newMarker = marker([e.latitude, e.longitude], {
      draggable: true
    }).addTo(this.map);
    this.newMarker.bindPopup("Estas Aquí").openPopup();
    //this.getAddress(e.latitude, e.longitude); 
 
    this.newMarker.on("dragend", () => {
      const position = this.newMarker.getLatLng();
      //this.getAddress(position.lat, position.lng);
     
    });
  });
}

/*getAddress(lat: number, long: number) {
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  this.geocoder.reverseGeocode(lat, long, options).then(results => {
    this.address = Object.values(results[0]).reverse();
    
  });
}*/

  /*goBack(){
    this.router.navigate(["home"]);
  }*/
  async closeModal() {
    console.log("close apretado");
    await this.modalController.dismiss(this.address);
  }
}
