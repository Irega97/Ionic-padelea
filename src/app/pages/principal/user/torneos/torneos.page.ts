import { TorneoService } from '../../../../services/torneo.service';
import { EventsService } from '../../../../services/events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.page.html',
  styleUrls: ['./torneos.page.scss'],
})
export class TorneosPage implements OnInit {

  torneos
  torneosSearch;

  constructor(private torneoService: TorneoService, private events: EventsService) { }

  ngOnInit() {
    this.torneoService.getMyTorneos().subscribe((data) => {
      console.log(data);
      this.torneos = data.torneos;
      this.torneosSearch = this.torneos;      
    });
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "new-torneo") {
        this.torneoService.getMyTorneos().subscribe((data) => {
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
          console.log("P ", t.torneo);
          return (t.torneo.name.toLowerCase().indexOf(query) > -1)
        }
        else return t.torneo;
      });
    });
  }
}
