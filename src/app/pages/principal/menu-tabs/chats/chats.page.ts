import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatPage implements OnInit {

  chats;
  chatsSearch;
  cargando: Boolean = true;

  constructor( private events: EventsService, private chatService : ChatService, private userService: UserService, private router: Router ) { }

  ngOnInit() {
    if (this.userService.user != undefined){
      this.chatService.getMyChats().subscribe((data) => {
        this.chats = data.chats;
        this.chats.forEach(chat => {
          if (chat.name == undefined){
            if (chat.users[0].username != this.userService.user.username){
              chat.image = chat.users[0].image;
              chat.name = chat.users[0].username;
            }
            else{
              chat.image = chat.users[1].image;
              chat.name = chat.users[1].username;
            }
          }
          chat.ultimomensaje =  chat.mensajes[chat.mensajes.length -1].sender + ": " + chat.mensajes[chat.mensajes.length -1].body;
        })
        this.chatsSearch = this.chats; 
        this.cargando = false;     
      }); 
    }
    
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser"){
        this.chatService.getMyChats().subscribe((data) => {
          this.chats = data.chats;
          this.chats.forEach(chat => {
            if (chat.name == undefined){
              if (chat.users[0].username != this.userService.user.username){
                chat.image = chat.users[0].image;
                chat.name = chat.users[0].username;
              }
              else{
                chat.image = chat.users[1].image;
                chat.name = chat.users[1].username;
              }
            }
            if (chat.mensajes[chat.mensajes.length -1].sender == this.userService.user.username)
              chat.ultimomensaje =  "Yo: " + chat.mensajes[chat.mensajes.length -1].body;
            else
              chat.ultimomensaje =  chat.mensajes[chat.mensajes.length -1].sender + ": " + chat.mensajes[chat.mensajes.length -1].body;
          })
          this.chatsSearch = this.chats; 
          this.cargando = false;     
        }); 
      }

      else if (data.topic == "new-chat") {
        this.chatService.getMyChats().subscribe((data) => {
          this.chats = data;
          this.chatsSearch = this.chats;      
        });
      }
    });
  }

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.chatsSearch = this.chats.filter((chat)=>{
        if(chat.name && query != ''){
          return (chat.name.toLowerCase().indexOf(query) > -1)
        }
        else return chat;
      });
    });
  }

  goChat(chat){
    if (chat.admin.length == 0)
      this.router.navigateByUrl('/chat/user/' + chat.name);
    else
      this.router.navigateByUrl('/chat/grupo/' + chat.name);
  }
}
