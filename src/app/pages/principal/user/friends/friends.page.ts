import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friends;
  friendsSearch;
  username: string;

  constructor(private friendService: FriendsService, private events: EventsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      this.friendService.getFriends(this.username).subscribe((data) => {
        this.friends = data.friends;
        this.friendsSearch = this.friends;      
      });
    });

    /*this.events.getObservable().subscribe((data)=> {
      if (data.topic == "loginUser") {
        this.friendService.getMyFriends().subscribe((data) => {
          this.friends = data.friends;
          this.friendsSearch = this.friends;      
        });
      }
    });*/
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
