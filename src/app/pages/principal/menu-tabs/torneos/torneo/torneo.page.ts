import { ComponentsService } from './../../../../../services/components.service';
import { ActivatedRoute } from '@angular/router';
import { TorneoService } from './../../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {

  torneo;
  id;
  players;
  
  constructor(private torneoService: TorneoService, private route: ActivatedRoute, private component: ComponentsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.torneoService.getTorneo(this.id).subscribe(data =>{
        this.torneo = data;
        this.players = data.players;
      }, error => {
        console.log(error);
      });
    });
  }

  joinTorneo(){
    this.torneoService.joinTorneo(this.id).subscribe((null), (error)=>{
      console.log(error);
      this.component.presentAlert("No has podido unirte");
    })
  }
}
