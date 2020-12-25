import { FriendsService } from '../../../../services/friends.service';
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
      this.friends = data.friends;
      this.friendsSearch = this.friends;      
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "loginUser") {
        this.friendService.getMyFriends().subscribe((data) => {
          this.friends = data.friends;
          this.friendsSearch = this.friends;      
        });
      }
    });
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
}
