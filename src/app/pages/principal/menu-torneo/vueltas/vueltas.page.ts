import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';

@Component({
  selector: 'app-vueltas',
  templateUrl: './vueltas.page.html',
  styleUrls: ['./vueltas.page.scss'],
})
export class VueltasPage implements OnInit {

  name: string;
  vueltaActual: number;
  vueltas = [];

  constructor(private route: Router, private torneoService: TorneoService) {}

  ngOnInit(){
    this.name = this.route.url.split('/')[2];
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }

    this.torneoService.getVueltas(this.name).subscribe((data) => {
      this.vueltaActual = data.vueltaActual;
      if(this.vueltaActual != 0){
        for(let i = 0; i<this.vueltaActual; i++){
          this.vueltas.push(i+1);
        }
      }
    })
  }

  checkValue(event){ 
    console.log(event.detail.value)
  }
}
