import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  cola: [];

  constructor(private adminService: AdminService, private route: ActivatedRoute, private component: ComponentsService, private events: EventsService) { }

  ngOnInit() {
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

  acceptPlayer(username: string){
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
