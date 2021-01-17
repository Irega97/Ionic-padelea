import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';

@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage {

  address:string[];
  constructor() { }

}
