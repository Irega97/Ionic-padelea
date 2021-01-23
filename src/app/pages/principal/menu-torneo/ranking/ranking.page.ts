import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TorneoService} from '../../../../services/torneo.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  name: string;

  ranking: any = [];
  
  constructor(private torneoService: TorneoService, private router:Router ) { }
  
  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    this.torneoService.getRanking(this.name).subscribe((data) => {
      console.log("hola ", data);      
    });
    
  }

}
