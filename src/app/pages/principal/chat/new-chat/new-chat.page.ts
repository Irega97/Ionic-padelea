import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';
import { FriendsService } from 'src/app/services/friends.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {

  friends;
  friendsSearch;
  cargando: Boolean = true;
  numParticipantes: number = 0;
  participantes = [];

  constructor(private router: Router, private events: EventsService, private userService: UserService, 
    private friendService: FriendsService, private components: ComponentsService)  { }

  ngOnInit() {
    if (this.userService.user != undefined){
      this.friendService.getFriends(this.userService.user.username).subscribe(data => {
        this.friends = data.friends;
        this.friends.forEach(friend => {
          friend.selected = false;
        })
        this.friendsSearch = this.friends;
        this.cargando = false;
      })
    }

    this.events.getObservable().subscribe(data =>{
      if (data.topic == "updateUser"){
        this.friendService.getFriends(this.userService.user.username).subscribe(data => {
          this.friends = data.friends;
          this.friends.forEach(friend => {
            friend.selected = false;
          })
          this.friendsSearch = this.friends;
          this.cargando = false;
        })
      }
    })
  }

  ionViewWillEnter(){
    this.participantes = [];
  }

  changeSelected(friend){
    if (friend.selected)
      this.numParticipantes++;
    
    else
      this.numParticipantes--;
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.friendsSearch = this.friends.filter((friend)=>{
        if(friend.user.username && query != ''){
          return (friend.user.username.toLowerCase().indexOf(query) > -1)
        }
        else return friend.user;
      });
    });
  }

  goAddChat(){
    this.participantes.push(this.userService.user);
    this.friends.forEach(friend => {
      if (friend.selected)  
        this.participantes.push(friend.user);
    })

    if (this.participantes.length > 2){
      let navigationExtras: NavigationExtras = {
        state: {
          participantes: this.participantes
        }
      };
      this.router.navigate(['chat/nuevo/form'], navigationExtras);
    }

    else{
      this.participantes = [];
      this.components.presentAlert("Necesitas un mínimo de 2 participantes");
    }
  }
}
