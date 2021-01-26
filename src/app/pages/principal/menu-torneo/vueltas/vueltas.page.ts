import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';
import {  PartidosService } from '../../../../services/partidos.service';
import {User} from '../../../../models/user';
import {Statistics} from '../../../../models/statistics';





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
  nameVuelta:string;
  players=[];



  constructor(private router: Router, private torneoService: TorneoService, private partidoService:PartidosService) {}

  ngOnInit(){
    this.name = this.router.url.split('/')[2];
    this.torneoService.getVueltas(this.name).subscribe((data) => {
      this.vueltaActual = data.vueltaActual;
      if(this.vueltaActual > -1){
        this.vueltas.push(data.vueltas.previa);
        this.vueltas[0].name = "Previa";
        for(let i = 0; i < data.vueltas.rondas.length; i++){
          this.vueltas.push(data.vueltas.rondas[i]);
        }
        
        this.fechaFin = new Date(this.vueltas[this.vueltas.length - 1].fechaFin);
        this.fechaFin = this.fechaFin.toLocaleString().split(' ')[0];
        console.log(this.vueltas);
        for (let i = 0; i < this.vueltas[this.vueltas.length - 1].grupos.length; i++){
          
          this.grupos.push(this.vueltas[this.vueltas.length - 1].grupos[i]);
        }
      }
    })
    console.log("vuelta ", this.vueltas);
 

/*
    this.partidoService.getPartidosGrupo(this.name,this.nameVuelta,this.nameGrupo).subscribe((data) => {
      if(data != null){
        
        //FALTA HACER EL CODIGO PARA QUE LEA EL BODY DEL BACKEND Y SEA CAPAZ DE ASIGNAR LOS DATOS DE LOS JUGADORES Y LA 
        //CLASSIFICACION HACIENDO UN FOREACH PARA CADA JUGADOR DEL PARTIDO
        if(data.grupos.groupName == this.nameGrupo){
          
          data.forEach(player => {
            this.user._id=data.grupos.classification.player._id;
            this.user.username=data.grupos.classification.player.username;
            this.statistics.partidosJugados=data.grupos.classification.statistics.partidosJugados;
          this.statistics.partidosGanados=data.grupos.classification.statistics.partidosGanados;
          this.statistics.partidosPerdidos=data.grupos.classification.statistics.partidosPerdidos;
          this.statistics.setsGanados=data.grupos.classification.statistics.setsGanados;
          this.statistics.setsPerdidos=data.grupos.classification.statistics.setsPerdidos;
          this.statistics.juegosGanados=data.grupos.classification.statistics.juegosGanados;
          this.statistics.juegosPerdidos=data.grupos.classification.statistics.juegosPerdidos;
          this.statistics.juegosDif=data.grupos.classification.statistics.juegosDif;
          this.statistics.puntos=data.grupos.classification.statistics.puntos;
          this.statistics.puntosExtra=data.grupos.classification.statistics.puntosExtra;  
          });
        }
  
        else{
          console.log("No hay datos de" + this.nameGrupo + "para la vuelta" + this.nameVuelta + "en el torneo" +this.name);
        }
  
      }
  
    
    });*/
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
