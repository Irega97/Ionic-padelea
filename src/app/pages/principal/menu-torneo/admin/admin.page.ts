import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  cola: [];
  //max;
  length;
  name: string;
  fechaInicio;
  empezado: Boolean = false;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router, private component: ComponentsService, 
    private events: EventsService, private torneoService: TorneoService) { }

  ngOnInit() {
    /*if (this.router.getCurrentNavigation().extras.state != undefined){
      this.max =  this.router.getCurrentNavigation().extras.state.maxPlayers;
      this.length = this.router.getCurrentNavigation().extras.state.playersLength;
    }*/

    this.name = this.router.url.split('/')[2];
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }

    this.adminService.setName(this.name)
    this.torneoService.getTorneo(this.name).subscribe(data =>{
      this.length = data.torneo.players.length;
      this.fechaInicio = Date.parse(new Date(data.torneo.fechaInicio).toString());
      if (this.fechaInicio < Date.now()){
        this.empezado = true;
      }
    });
    this.adminService.getCola().subscribe((data) => {
      this.cola = data.cola;
    });
    this.events.getObservable().subscribe((data) => {
      if(data.topic == "nuevoJugador"){
        this.adminService.getCola().subscribe((data) => {
          this.cola = data.cola;
        })
      }
    })
  }

  empezarPrevia(){
    if (this.length > 3){
      this.adminService.empezarPrevia().subscribe(data => {
        this.component.presentAlert(data.message);
      })
    }

    else
      this.component.presentAlert("Hay que ser como mínimo 4 para empezar el torneo");
  }

  finalizarRonda(){
    if (this.length % 4 == 0){
      this.adminService.finalizarRonda().subscribe(data => {
        this.component.presentAlert(data.message);
      })
    }

    else
      this.component.presentAlert("Hay que ser un múltiplo de 4 para poder finalizar una ronda");
  }

  acceptPlayer(username: string){
    /* if(this.length < this.max){
      this.adminService.acceptPlayers({user: username, accept: true}).subscribe((data) => {
        this.component.presentAlert(data.message);
      })
    } else {
      this.component.presentAlert("El torneo ya está lleno");
    } */
    this.adminService.acceptPlayers({user: username, accept: true}).subscribe((data) => {
      this.component.presentAlert(data.message);
    })
  }

  rejectPlayer(username: string){
    this.adminService.acceptPlayers({user: username, accept: false}).subscribe((data) => {
      this.component.presentAlert(data.message);
    })
  }
}
