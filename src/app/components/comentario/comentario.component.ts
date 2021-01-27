import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
})
export class ComentarioComponent implements OnInit {

  @Input()
  comentarios;

  constructor() { }

  ngOnInit() {}

}
