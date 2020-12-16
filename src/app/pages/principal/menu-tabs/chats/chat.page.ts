import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chats;
  chatsSearch;

  constructor( private events: EventsService, private chatService : ChatService ) { }

  ngOnInit() {
    this.chatService.getMyChats().subscribe((data) => {
      console.log(data);
      this.chats = data;
      this.chatsSearch = this.chats;      
    }); 
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "new-chat") {
        this.chatService.getMyChats().subscribe((data) => {
          this.chats = data;
          this.chatsSearch = this.chats;      
        });
      }
    });
    
  }

  /* const searchbar = document.querySelector('ion-searchbar');
  const items = this.users;

  searchbar.addEventListener('ionInput', handleInput); */

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.chatsSearch = this.chats.filter((chat)=>{
        //console.log("q: " +user.username, user.username.indexOf(query));
        if(chat.name && query != ''){
          console.log("P ", chat);
          return (chat.name.toLowerCase().indexOf(query) > -1)
        }
        else return chat;
      });
    });
  }

}
