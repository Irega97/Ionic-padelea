import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-menu-torneo',
  templateUrl: './menu-torneo.page.html',
  styleUrls: ['./menu-torneo.page.scss'],
})
export class MenuTorneoPage implements OnInit {

  isAdmin;

  constructor(private route: ActivatedRoute, private torneoService: TorneoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      let name = paramMap.get('name');
      this.torneoService.getTorneo(name).subscribe(data =>{
        this.isAdmin = data.isAdmin;
      });
    });
  }

}
