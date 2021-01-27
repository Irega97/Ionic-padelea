import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import {TorneoService} from '../../../../services/torneo.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  name: string;

  ranking: any = [];
  isImage: boolean;
  idTorneo: string;
  
  constructor(private torneoService: TorneoService, private router:Router, private events: EventsService) { }
  
  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    this.torneoService.getRanking(this.name).subscribe((data) => {
      this.ranking = data.ranking;  
      this.isImage = data.isImage;  
      this.idTorneo = data.idTorneo;  
    });

    this.events.getObservable().subscribe(data => {
      if (data.topic == "clasificacion" && data.clasificacion.idTorneo == this.idTorneo){
        this.torneoService.getRanking(this.name).subscribe((data) => {
          this.ranking = data.ranking;  
          this.isImage = data.isImage;    
        });
      }
    })
  }
}
