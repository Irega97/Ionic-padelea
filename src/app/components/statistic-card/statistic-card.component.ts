import { Component,  Input,  OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PartidosService} from '../../services/partidos.service'
import {Statistics} from '../../models/statistics'
import {User} from '../../models/user'

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss'],
})
export class StatisticCardComponent implements OnInit {

  
  
  constructor(private router:Router, private partidosService: PartidosService) { }

  nameTorneo:string;
  nameGrupo:string;
  nameVuelta:string;
  statistics:Statistics;
  user:User;
  jugador:object;


  ngOnInit() {
  this.nameTorneo= this.router.url.split('/')[2];
  this.nameGrupo=this.router.url.split('/')[5];
  this.nameVuelta=this.router.url.split('/')[4];

  //ASEGURARME QUE LA FUNCION QUE QUIERO HACER EN EL PARTIDO.SERVICE NO SEA LA MISMA QUE ESTA

  this.partidosService.getPartidosGrupo(this.nameTorneo,this.nameVuelta,this.nameGrupo).subscribe((data)=>{
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
        console.log("No hay datos de" + this.nameGrupo + "para la vuelta" + this.nameVuelta + "en el torneo" +this.nameTorneo);
      }

    }
    else{
      console.log("Error");
    }

  }
  )
  }
}
