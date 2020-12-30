import { TorneoService } from '../../../../services/torneo.service';
import { EventsService } from '../../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  torneos;
  torneosSearch;
  username: string;
  cargando: Boolean = true;

  constructor(private torneoService: TorneoService, private events: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      this.torneoService.getTorneosUser(this.username).subscribe((data) => {
        this.torneos = data.torneos;
        this.torneosSearch = this.torneos;  
        this.cargando = false;    
      });
    });
    
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "nuevoJugador" && data.jugador.username == this.username){
        let torneos = {
          torneo: {
            name: data.jugador.torneo
          }
        }
        this.torneos.push(torneos);
        if (this.torneos.length != this.torneosSearch.length)
          this.torneosSearch.push(torneos);
      }

      else if (data.topic == "player-left" && data.jugador.username == this.username){
        this.torneos = this.torneos.filter(torneo =>{
          if(torneo.torneo.name == data.jugador.torneo){
            let i = this.torneos.indexOf(torneo);
            this.torneos.splice(i, 1);
            if (this.torneos.length != this.torneosSearch.length){
              let i = this.torneosSearch.indexOf(torneo);
              this.torneosSearch.splice(i, 1);
            }
          }
        })
      }
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.torneosSearch = this.torneos.filter((t)=>{
        if(t.torneo.name && query != ''){
          return (t.torneo.name.toLowerCase().indexOf(query) > -1)
        }
        else return t.torneo;
      });
    });
  }
}
