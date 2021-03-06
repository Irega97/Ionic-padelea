import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatPage implements OnInit {

  chats = [];
  chatsSearch = [];
  cargando: Boolean = true;

  constructor(private events: EventsService, private chatService : ChatService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    moment.locale('es');
    if (this.userService.user != undefined){
      this.chatService.getMyChats().subscribe((data) => {
        if (this.chats.length > 0){
          this.chats = [];
          this.chatsSearch = this.chats;
        }

        data.chats.forEach(chat => {
          if (chat.chat.name == undefined){
            if (chat.chat.users[0].username != this.userService.user.username){
              chat.chat.image = chat.chat.users[0].image;
              chat.chat.name = chat.chat.users[0].username;
            }
            else{
              chat.chat.image = chat.chat.users[1].image;
              chat.chat.name = chat.chat.users[1].username;
            }
          }
          
          if (chat.chat.mensajes[chat.chat.mensajes.length -1].sender == this.userService.user.username)
            chat.chat.ultimomensaje =  "Yo: " + chat.chat.mensajes[chat.chat.mensajes.length -1].body;

          else if (chat.chat.mensajes[chat.chat.mensajes.length -1].sender == undefined)
            chat.chat.ultimomensaje =  chat.chat.mensajes[chat.chat.mensajes.length -1].body;

          else
            chat.chat.ultimomensaje =  chat.chat.mensajes[chat.chat.mensajes.length -1].sender + ": " + chat.chat.mensajes[chat.chat.mensajes.length -1].body;

          if (chat.ultimoleido < chat.chat.mensajes.length)
            chat.chat.leido = false;
          
          else
            chat.chat.leido = true;
          
          this.chats.push(chat.chat);
        })
        this.chatsSearch = this.chats; 
        this.chatsSearch.sort((a,b) => {
          if (a.mensajes[a.mensajes.length -1].date < b.mensajes[b.mensajes.length -1].date)
            return 1;
          
          else if (a.mensajes[a.mensajes.length -1].date > b.mensajes[b.mensajes.length -1].date)
            return -1;

          else
            return 0;
        });
        this.cargando = false;     
      }); 
    }
    
    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser"){
        this.chats = [];
        this.chatsSearch = [];
        this.chatService.getMyChats().subscribe((data) => {
          data.chats.forEach(chat => {
            if (chat.chat.name == undefined){
              if (chat.chat.users[0].username != this.userService.user.username){
                chat.chat.image = chat.chat.users[0].image;
                chat.chat.name = chat.chat.users[0].username;
              }
              else{
                chat.chat.image = chat.chat.users[1].image;
                chat.chat.name = chat.chat.users[1].username;
              }
            }
  
            if (chat.chat.mensajes[chat.chat.mensajes.length -1].sender == this.userService.user.username)
              chat.chat.ultimomensaje =  "Yo: " + chat.chat.mensajes[chat.chat.mensajes.length -1].body;

            else if (chat.chat.mensajes[chat.chat.mensajes.length -1].sender == undefined)
              chat.chat.ultimomensaje =  chat.chat.mensajes[chat.chat.mensajes.length -1].body;

            else
              chat.chat.ultimomensaje =  chat.chat.mensajes[chat.chat.mensajes.length -1].sender + ": " + chat.chat.mensajes[chat.chat.mensajes.length -1].body;
  
            if (chat.ultimoleido < chat.chat.mensajes.length)
              chat.chat.leido = false;

            else
              chat.chat.leido = true;
  
            this.chats.push(chat.chat);
          })
          this.chatsSearch = this.chats; 
          this.chatsSearch.sort((a,b) => {
            if (a.mensajes[a.mensajes.length -1].date < b.mensajes[b.mensajes.length -1].date)
              return 1;
            
            else if (a.mensajes[a.mensajes.length -1].date > b.mensajes[b.mensajes.length -1].date)
              return -1;
  
            else
              return 0;
          });
          this.cargando = false;     
        }); 
      }

      else if (data.topic == 'nuevoChat'){
        let chat = data.chat;
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

        if (chat.mensajes[0].sender == this.userService.user.username){
          chat.ultimomensaje = "Yo: " + chat.mensajes[chat.mensajes.length -1].body;
          chat.leido = true;
        }

        else if (chat.mensajes[0].sender == undefined){
          chat.ultimomensaje = chat.mensajes[chat.mensajes.length -1].body;
          if (chat.admin[0] == this.userService.user._id)
            chat.leido = true;

          else
            chat.leido = false;
        }

        else{
          chat.ultimomensaje = chat.mensajes[0].sender + ": " + chat.mensajes[chat.mensajes.length -1].body;
          chat.leido = false;
        }
        
        this.chats.splice(0, 0, chat);
        this.chatsSearch = this.chats;
      }

      else if (data.topic == "nuevoMensaje"){
        this.chats.forEach(chat => {
          if (chat._id == data.mensaje.chat){
            if (data.mensaje.mensaje.sender != undefined){
              if (data.mensaje.mensaje.sender == this.userService.user.username){
                chat.leido = true;
                chat.ultimomensaje = "Yo: " + data.mensaje.mensaje.body;
              }
              else if (data.mensaje.mensaje.sender != undefined){
                chat.leido = false;
                chat.ultimomensaje = data.mensaje.mensaje.sender + ": " + data.mensaje.mensaje.body;
              }
            }
            else{
              chat.ultimomensaje = data.mensaje.mensaje.body;
            }

            chat.mensajes.push(data.mensaje.mensaje);
          }
        })
        this.chatsSearch = this.chats;
        this.chatsSearch.sort((a,b) => {
          if (a.mensajes[a.mensajes.length -1].date < b.mensajes[b.mensajes.length -1].date)
            return 1;
          
          else if (a.mensajes[a.mensajes.length -1].date > b.mensajes[b.mensajes.length -1].date)
            return -1;

          else
            return 0;
        });
      }

      else if (data.topic == "chatLeido"){
        this.chats.forEach(chat => {
          if (chat._id == data.chatid){
            chat.leido = true;
          }
        })
      }

      else if (data.topic == "borrarChat"){
        this.chats.forEach(chat => {
          if (chat._id == data.chat){
            this.chats.splice(this.chats.indexOf(chat), 1);
            this.chatsSearch = this.chats;
          }
        })
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

  getMoment(chat){
    let day: Date = new Date(chat.mensajes[chat.mensajes.length -1].date);
    return moment(day, "YYYYMMDD, h:mm").startOf('minute').fromNow();;
  }

  goChat(chat){
    chat.leido = true;
    if (chat.admin.length == 0)
      this.router.navigateByUrl('/chat/user/' + chat.name);
    else
      this.router.navigateByUrl('/chat/grupo/' + chat.name);
  }
}
