import { FriendsService } from './../../../../services/friends.service';
import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  friends
  friendsSearch;

  constructor(private friendService: FriendsService, private events: EventsService) { }

  ngOnInit() {
    this.friendService.getMyFriends().subscribe((data) => {
      this.friends = data;
      this.friendsSearch = this.friends;      
    });
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "loginUser") {
        this.friendService.getMyFriends().subscribe((data) => {
          this.friends = data;
          this.friendsSearch = this.friends;      
        });
      }
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.friendsSearch = this.friends.filter((user)=>{
        //console.log("q: " +user.username, user.username.indexOf(query));
        if(user.username && query != ''){
          console.log("P ", user);
          return (user.username.toLowerCase().indexOf(query) > -1)
        }
        else return user;
      });
    });
  }
}
