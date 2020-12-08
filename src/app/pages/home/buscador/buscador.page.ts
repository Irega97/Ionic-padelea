import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  @Input() users;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
