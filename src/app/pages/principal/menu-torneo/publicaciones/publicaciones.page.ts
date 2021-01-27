import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {

  publicaciones: any = [];
  name: string;

  constructor(private publiService: PublicacionesService, private router: Router) { }

  ngOnInit() {
    moment.locale('es');
    this.name = this.router.url.split('/')[2];
    if(this.name.includes("%20")){
      this.name = unescape(this.name);
    }

    if(this.name != undefined) {
      this.publiService.getPublicationsTorneo(this.name).subscribe((data: any) => {
        console.log(data);
        this.publicaciones = data.publicaciones;
        this.publicaciones.forEach((publi) => {
          this.publicaciones[this.publicaciones.indexOf(publi)].date = this.getMoment(publi);
          console.log("Publis: ", this.publicaciones.date);
        });
      });
    }
  }

  getMoment(publi){
    let day: Date = new Date(publi.date);
    return moment(day, "YYYYMMDD, h:mm").startOf('minute').fromNow();;
  }

}
