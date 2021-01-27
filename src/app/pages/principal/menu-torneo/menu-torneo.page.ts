import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
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
  cola: number = 0;
  name: string;

  constructor(private router: Router, private torneoService: TorneoService, private events: EventsService, private userService: UserService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    this.adminService.setName(unescape(this.name));
    this.torneoService.getTorneo(this.name).subscribe(data =>{
      this.isAdmin = data.isAdmin;
      this.cola = data.torneo.cola.length;
    });

    this.events.getObservable().subscribe(data=> {
      if (data.topic == "nuevoJugadorCola" && data.torneo == this.name){
        this.cola++;
      }

      else if (data.topic == "respondidoJugadorCola" && data.torneo == this.name)
        this.cola--;
    })
  }

}
