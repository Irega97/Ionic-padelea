import { Router } from '@angular/router';
import { TorneoService } from './../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  torneos;
  torneosSearch;
  cargando: Boolean = true;

  constructor(private torneoService: TorneoService, private events: EventsService, private router: Router) { }

  ngOnInit() {
    this.torneoService.getTorneos().subscribe((data) => {
      this.torneos = data;
      this.torneosSearch = this.torneos;
      this.cargando = false;      
    }); 
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "nuevoTorneo") {
        this.torneos.push(data.torneo);
        console.log("Torneos", this.torneos);
      }
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.torneosSearch = this.torneos.filter((torneo)=>{
        if(torneo.name && query != ''){
          return (torneo.name.toLowerCase().indexOf(query) > -1)
        }
        else return torneo;
      });
    });
  }

  goTorneo(name: string){
    let max, length;
    this.torneos.forEach((torneo) => {
      if(torneo.name == name){
        max = torneo.maxPlayers;
        length = torneo.players.length;
      }
    })
    this.router.navigate(['/torneo/'+ name + '/home'], { state : { maxPlayers: max, playersLength: length }});
  }
}
