import { EventsService } from '../../../../services/events.service';
import { ComponentsService } from '../../../../services/components.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../../../services/torneo.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.page.html',
  styleUrls: ['./torneo.page.scss'],
})
export class TorneoPage implements OnInit {

  torneo;
  name;
  isAdmin;
  players;
  joined: boolean;
  
  constructor(private torneoService: TorneoService, private route: ActivatedRoute, private component: ComponentsService, 
              private events: EventsService, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
      this.adminService.setName(this.name)
      this.torneoService.getTorneo(this.name).subscribe(data =>{
        this.isAdmin = data.isAdmin;
        this.joined = data.joined;
        this.torneo = data.torneo;
        this.players = data.torneo.players;
      });
    });
    //PREGUNTA TONI
    console.log("preguntar toni torneo page l.36");
    this.events.getObservable().subscribe((data)=> {
      console.log(data);
      if (data.topic == "nuevoJugador") {
        if(this.name == data.jugador.torneo)
          this.players.push(data.jugador);
      }
    });
  }

  joinTorneo(){
    this.torneoService.joinTorneo(this.name).subscribe((data) => {
      console.log("data:", data);
      this.events.publish({"topic":"nuevoJugador"});
      this.component.presentAlert(data.message);
      this.joined = true;
    }, (response)=>{
      console.log("error: ", response);
      this.component.presentAlert(response.error.message);
    })
  }

  leaveTorneo(){
    this.torneoService.leaveTorneo(this.name).subscribe((data) => {
      this.component.presentAlert(data.message);
      this.joined = false;
    })
  }
}
