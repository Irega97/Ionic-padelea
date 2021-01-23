
import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-puntos-card',
  templateUrl: './puntos-card.component.html',
  styleUrls: ['./puntos-card.component.scss'],
})
export class PuntosCardComponent implements OnInit {

  @Input()
  vueltas;

  constructor(private router: Router) { }

  ngOnInit() {}

}
