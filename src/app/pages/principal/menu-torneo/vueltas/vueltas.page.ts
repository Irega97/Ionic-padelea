import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';
import {User} from '../../../../models/user';
import {Statistics} from '../../../../models/statistics';
import { EventsService } from 'src/app/services/events.service';
import { Socket } from 'ngx-socket-io';

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
  fechaFin;
  user:User;
  statistics:Statistics;
  nameGrupo:string;
  players=[];
  idTorneo: string;

  constructor(private router: Router, private torneoService: TorneoService, private events: EventsService, private socket: Socket) {}

  ngOnInit(){
    this.name = this.router.url.split('/')[2];
    this.torneoService.getVueltas(this.name).subscribe((data) => {
      this.vueltaActual = data.vueltaActual;
      this.idTorneo = data.vueltas._id;
      if(this.vueltaActual > -1){
        this.vueltas.push(data.vueltas.previa);
        this.vueltas[0].name = "Previa";
        for(let i = 0; i < data.vueltas.rondas.length; i++){
          this.vueltas.push(data.vueltas.rondas[i]);
        }
        
        this.fechaFin = new Date(this.vueltas[this.vueltas.length - 1].fechaFin);
        this.fechaFin = this.fechaFin.toLocaleString().split(' ')[0];
        for (let i = 0; i < this.vueltas[this.vueltas.length - 1].grupos.length; i++){
          this.grupos.push(this.vueltas[this.vueltas.length - 1].grupos[i]);
        }
      }
    })

    this.events.getObservable().subscribe(data => {
      if (data.topic == "clasificacion" && data.clasificacion.idTorneo == this.idTorneo){
        let i: number = 0;
        let enc: boolean = false;

        while (i<this.vueltas.length && !enc){
          if (this.vueltas[i].name == data.clasificacion.vuelta)
            enc = true;

          else
            i++;
        }

        if (enc){
          enc = false;
          let j: number = 0;

          while (j<this.vueltas[i].grupos.length && !enc){
            if (this.vueltas[i].grupos[j].groupName == data.clasificacion.groupName)
              enc = true;

            else
              j++;
          }

          if (enc){
            this.vueltas[i].grupos[j].classification = data.clasificacion.clasificacion;
          }
        }
      }
    })

    this.socket.on('nuevaVuelta', vuelta => {
      if (vuelta.torneo == this.idTorneo){
        if (vuelta.vuelta.name == undefined){
          vuelta.vuelta.name = "Previa";
          this.vueltas.push(vuelta.vuelta);
          this.vueltaActual = 0;
          this.fechaFin = new Date(this.vueltas[this.vueltas.length - 1].fechaFin);
          this.fechaFin = this.fechaFin.toLocaleString().split(' ')[0];
          for (let i = 0; i < this.vueltas[this.vueltas.length - 1].grupos.length; i++){
            this.grupos.push(this.vueltas[this.vueltas.length - 1].grupos[i]);
          }
        }

        else
          this.vueltas.push(vuelta.vuelta);
      }
    })
  }

  checkValue(event){ 
    this.grupos = [];
    this.vueltaActual = event.detail.value;
    this.fechaFin = new Date(this.vueltas[event.detail.value].fechaFin);
    this.fechaFin = this.fechaFin.toLocaleString().split(' ')[0];
    for (let i = 0; i < this.vueltas[event.detail.value].grupos.length; i++){
      this.grupos.push(this.vueltas[event.detail.value].grupos[i]);
    }
  }

  goInformacion(groupName: string){
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }
    
    this.router.navigate(['torneo/' + this.name + "/vueltas/" + this.vueltas[this.vueltaActual].name + "/" + groupName]);
  }
}
