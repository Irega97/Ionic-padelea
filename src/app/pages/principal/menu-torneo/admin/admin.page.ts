import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  cola: [];

  constructor(private adminService: AdminService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.adminService.getCola().subscribe((data) => {
      this.cola = data.cola;
    });
  }

  acceptPlayer(name: string){
    this.adminService.acceptPlayers({plaaer: name, ccept: true}).subscribe((data) => {
      console.log(data.message);
    })
  }

  rejectPlayer(name: string){
    this.adminService.acceptPlayers({player: name, accept: false}).subscribe((data) => {
      console.log(data.message);
    })
  }
}
