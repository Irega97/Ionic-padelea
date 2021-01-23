import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocationPosition, Geolocation } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      returnType: 'json'
    });
  }

  public getLocation = async ():Promise<GeolocationPosition> => {
    let lat:number;
    let lon:number;
    
    try{
      //coordenadas de Padelarium Gavà
      lat = 41.28419741151979;
      lon = 1.9944762978072328;
        
    }
    catch(err){
      console.log(err);
    }
    finally{
      let position:GeolocationPosition = Object({
        coords:{
          latitude: lat,
          longitude: lon
        }
      });
      return position;
    }
  }
}
