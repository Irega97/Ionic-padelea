import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsService } from 'src/app/services/components.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {

  idTorneo: string;
  name: string;
  vuelta: string;
  grupo: string;
  partidos = [];
  clasification = [];
  participa: Boolean = false;
  juego1: number;
  juego2: number;
  juego3: number;
  juego4: number;
  juego5: number;
  juego6: number;

  constructor(private router: Router, private partidosService: PartidosService, private userService: UserService, private components: ComponentsService) { }

  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    this.vuelta = this.router.url.split('/')[4];
    this.grupo = this.router.url.split('/')[5];

    this.partidosService.getPartidosGrupo(this.name, this.vuelta, this.grupo).subscribe(data => {
      this.idTorneo = data.idTorneo;
      this.clasification = data.grupos.classification;
      let i: number = 0;
      while (i < this.clasification.length && !this.participa){
        if (this.clasification[i].player._id == this.userService.user._id)
          this.participa = true;
        else
          i++;
      }

      this.partidos = data.grupos.partidos;
      this.partidos.forEach(partido => {
        partido.edit = false;
        if (partido.resultado == undefined)
          partido.resultado = "0-0 / 0-0"

        else{
          if(partido.resultado.set3 == '')
            partido.resultado = partido.resultado.set1 + " / " + partido.resultado.set2;
          
          else
            partido.resultado = partido.resultado.set1 + " / " + partido.resultado.set2 + " / " + partido.resultado.set3;
            
          if (partido.ganadores[0] == partido.jugadores.pareja1[0]._id){
            partido.jugadores.pareja1.ganadores = true;
            partido.jugadores.pareja2.ganadores = false;
          }

          else{
            partido.jugadores.pareja2.ganadores = true;
            partido.jugadores.pareja1.ganadores = false;
          }
        }
      })
    });
  }

  modificar(i: number){
    this.partidos[i].edit = true;
    let split = this.partidos[i].resultado.split('/');
    this.juego1 = parseInt(split[0].split('-')[0]);
    this.juego2 = parseInt(split[0].split('-')[1]);
    this.juego3 = parseInt(split[1].split('-')[0]);
    this.juego4 = parseInt(split[1].split('-')[1]);

    if (split.length == 3){
      this.juego5 = parseInt(split[2].split('-')[0]);
      this.juego6 = parseInt(split[2].split('-')[1]);
    }

    else{
      this.juego5 = 0;
      this.juego6 = 0;
    }
  }

  cancelar(i: number){
    this.partidos[i].edit = false;
  }

  enviar(i: number){
    let sets1 = 0, sets2 = 0;

    if (this.juego1 == undefined || this.juego2 == undefined || this.juego3 == undefined || this.juego4 == undefined){
      this.components.presentAlert("Introduce el resultado de todos los sets");
    } else if (this.juego1 > 7 || this.juego2 > 7 || this.juego3 > 7 || this.juego4 > 7){
      this.components.presentAlert("Resultado Incorrecto");
    } else if ((this.juego1 == this.juego2) || (this.juego3 == this.juego4)){
      this.components.presentAlert("Resultado Incorrecto");
    } else if (this.juego1 > this.juego2 && this.juego3 < this.juego4 && (this.juego5 == undefined || this.juego6 == undefined)){
      this.components.presentAlert("Set 3 necesario");
    } else if (this.juego5 > 10 || this.juego6 > 10){
      this.components.presentAlert("No puedes poner más de 10 sets");
    } else if ((this.juego1 < 6 && this.juego2 < 6) || (this.juego3 < 6 && this.juego4 < 6)){
      this.components.presentAlert("Resultado Incorrecto");
    }
    else{
      this.partidos[i].edit = false;
      
      if(this.juego1 > this.juego2) sets1++; else sets2++;
      if(this.juego3 > this.juego4) sets1++; else sets2++;

      let body = {
        idTorneo: this.idTorneo,
        idPartido: this.partidos[i]._id,
        set1: this.juego1 + '-' + this.juego2,
        set2: this.juego3 + '-' + this.juego4,
        set3: this.juego5 + '-' + this.juego6,
        ganadores: [],
        juegos1: this.juego1 + this.juego3,
        juegos2: this.juego2 + this.juego4,
        sets1: sets1,
        sets2: sets2
      }
  
      if(this.juego1 > this.juego2 && this.juego3 > this.juego4){
        body.ganadores.push(this.partidos[i].jugadores.pareja1[0]);
        body.ganadores.push(this.partidos[i].jugadores.pareja1[1]);
      } else if (this.juego1 < this.juego2 && this.juego3 < this.juego4){
        body.ganadores.push(this.partidos[i].jugadores.pareja2[0]);
        body.ganadores.push(this.partidos[i].jugadores.pareja2[1]);
      } else {
        if(this.juego5 > this.juego6){
          body.ganadores.push(this.partidos[i].jugadores.pareja1[0]);
          body.ganadores.push(this.partidos[i].jugadores.pareja1[1]);
        } else {
          body.ganadores.push(this.partidos[i].jugadores.pareja2[0]);
          body.ganadores.push(this.partidos[i].jugadores.pareja2[1]);
        }
      }
  
      if(this.juego5 == 0 && this.juego6 == 0)
        body.set3 = '';
      
      this.partidosService.addResultadoPartido(body).subscribe(() => {
        if (body.set3 != '')
          this.partidos[i].resultado = body.set1 + " / " + body.set2 + " / " + body.set3;
  
        else
          this.partidos[i].resultado = body.set1 + " / " + body.set2;
  
        this.partidos[i].ganadores = body.ganadores;
        if (this.partidos[i].ganadores[0] == this.partidos[i].jugadores.pareja1[0]){
          this.partidos[i].jugadores.pareja1.ganadores = true;
          this.partidos[i].jugadores.pareja2.ganadores = false;
        }
        
        else{
          this.partidos[i].jugadores.pareja2.ganadores = true;
          this.partidos[i].jugadores.pareja1.ganadores = false;
        }
  
        this.components.presentAlert("Resultado cambiado correctamente");
        this.juego1 = 0;
        this.juego2 = 0;
        this.juego3 = 0;
        this.juego4 = 0;
        this.juego5 = 0;
        this.juego6 = 0;
      });
    }
  }

  irChat(){
    this.router.navigate(['/chat/grupo/'+ this.name + " " + this.vuelta + " " + this.grupo]);
  }
}
