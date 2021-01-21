import { EventsService } from '../../../../services/events.service';
import { ComponentsService } from '../../../../services/components.service';
import { Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';

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
  
  constructor(private torneoService: TorneoService, private router: Router, private component: ComponentsService, 
              private events: EventsService) { }

  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    this.torneoService.getTorneo(this.name).subscribe(data =>{
      this.isAdmin = data.isAdmin;
      this.joined = data.joined;
      this.torneo = data.torneo;
      this.players = data.torneo.players;
      this.fechaInicio = new Date(this.torneo.fechaInicio);
      this.fechaInicio = this.fechaInicio.toLocaleString().split(' ');
      this.finInscripcion = new Date(this.torneo.finInscripcion);
      this.finInscripcion = this.finInscripcion.toLocaleString().split(' ');
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
        })
      }
    });
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
