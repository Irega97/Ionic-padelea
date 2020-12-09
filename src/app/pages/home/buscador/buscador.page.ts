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
      console.log(" ffff ", this.users[0]._id);
    });
  }

  /* const searchbar = document.querySelector('ion-searchbar');
  const items = this.users;

  searchbar.addEventListener('ionInput', handleInput); */

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.users.forEach(item => {
        let i = item.username;
        console.log("i: ", i);
        const shouldShow = i.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }
}
