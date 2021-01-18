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
  grupos = [];
  NombreVueltaActual: string;

  constructor(private router: Router, private torneoService: TorneoService) {}

  ngOnInit(){
    this.name = this.router.url.split('/')[2];

    this.torneoService.getVueltas(this.name).subscribe((data) => {
      this.vueltaActual = data.vueltaActual;
      if(this.vueltaActual > -1){
        if (this.vueltaActual == 0)
          this.NombreVueltaActual = "PREVIA";

        else
          this.NombreVueltaActual = "VUELTA " + this.vueltaActual;
        
        this.vueltas.push(data.vueltas.previa);
        this.vueltas[0].name = "Previa";
        for(let i = 0; i < data.vueltas.rondas.length; i++){
          this.vueltas.push(data.vueltas.rondas[i]);
        }

        for (let i = 0; i < this.vueltas[this.vueltas.length - 1].grupos.length; i++){
          this.grupos.push(this.vueltas[this.vueltas.length - 1].grupos[i]);
        }
        console.log("Grupos", this.grupos);
      }
    })
  }

  checkValue(event){ 
    this.grupos = [];
    this.vueltaActual = event.detail.value;
    this.NombreVueltaActual = this.vueltas[event.detail.value].name.toUpperCase();
    for (let i = 0; i < this.vueltas[event.detail.value].grupos.length; i++){
      this.grupos.push(this.vueltas[event.detail.value].grupos[i]);
    }
  }

  goInformacion(groupName: string){
    this.router.navigate(['torneo/' + this.name + "/vueltas/" + this.vueltas[this.vueltaActual].name + "/" + groupName]);
  }
}
