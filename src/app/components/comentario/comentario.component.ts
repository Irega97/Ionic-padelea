import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
})
export class ComentarioComponent implements OnInit {

  @Input()
  comentarios;

  constructor() { }

  ngOnInit() {
    moment.locale('es');
    console.log("Comentarios", this.comentarios);
    this.comentarios.forEach(comment => {
      this.getMoment(comment);
    });
  }
  getMoment(publi){
    let day: Date = new Date(publi.date);
    return moment(day, "YYYYMMDD, h:mm").startOf('minute').fromNow();;
  }

}
