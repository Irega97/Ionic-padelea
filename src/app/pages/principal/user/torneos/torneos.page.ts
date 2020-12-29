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
        console.log(data);
        this.torneos = data.torneos;
        this.torneosSearch = this.torneos;  
        this.cargando = false;    
      });
    });
    
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "new-torneo") {
        this.torneoService.getTorneosUser(this.username).subscribe((data) => {
          this.torneos = data.torneos;
          this.torneosSearch = this.torneos;      
        });
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
