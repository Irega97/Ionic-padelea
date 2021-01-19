import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-torneo',
  templateUrl: './menu-torneo.page.html',
  styleUrls: ['./menu-torneo.page.scss'],
})
export class MenuTorneoPage implements OnInit {

  isAdmin: Boolean = false;
  joined: Boolean = false;
  cola: number = 0;
  name: string;

  constructor(private route: ActivatedRoute, private torneoService: TorneoService, private events: EventsService, private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
      this.torneoService.getTorneo(this.name).subscribe(data =>{
        this.isAdmin = data.isAdmin;
        this.joined = data.joined;
        this.cola = data.torneo.cola.length;
      });
    });

    this.events.getObservable().subscribe(data=> {
      if (data.topic == "nuevoJugador" && data.jugador.torneo == this.name && data.jugador.username == this.userService.user.username)
        this.joined = true;

      else if (data.topic == "player-left" && data.jugador.torneo == this.name && data.jugador.username == this.userService.user.username)
        this.joined = false;

      else if (data.topic == "nuevoJugadorCola" && data.torneo == this.name)
        this.cola++;

      else if (data.topic == "respondidoJugadorCola" && data.torneo == this.name)
        this.cola--;
    })
  }

}
