import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  name: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state != undefined){
      console.log("Data", this.router.getCurrentNavigation().extras.state.chat)
      this.name =  this.router.getCurrentNavigation().extras.state.chat.name;
    }

    else{

    }
  }

}
