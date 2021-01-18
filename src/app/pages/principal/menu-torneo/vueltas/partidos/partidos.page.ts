import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidosService } from 'src/app/services/partidos.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {

  name: string;
  vuelta: string;
  grupo: string;

  constructor(private router: Router, private partidosService: PartidosService) { }

  ngOnInit() {
    this.name = this.router.url.split('/')[2];
    this.vuelta = this.router.url.split('/')[4];
    this.grupo = this.router.url.split('/')[5];

    this.partidosService.getPartidosGrupo(this.name, this.vuelta, this.grupo).subscribe(data => {
      console.log("Data", data);
    });
  }

}
