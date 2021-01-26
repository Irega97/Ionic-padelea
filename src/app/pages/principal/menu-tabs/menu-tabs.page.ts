import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.page.html',
  styleUrls: ['./menu-tabs.page.scss'],
})
export class MenuTabsPage implements OnInit {

  chatsSinLeer: string[] = [];
  constructor(private chatService: ChatService, private events: EventsService, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.chatService.getChatsSinLeer().subscribe(data => {
      this.chatsSinLeer = data;
    })

    this.events.getObservable().subscribe(data=>{
      if (data.topic == "nuevoChat"){
        if ((data.chat.name == undefined && data.chat.mensajes[0].sender != this.userService.user.username) || (data.chat.name != undefined && data.chat.admin[0] != this.userService.user._id))
          this.chatsSinLeer.push(data.chat._id);
      }

      else if (data.topic == "nuevoMensaje" && data.mensaje.mensaje.sender != this.userService.user.username){
        let enc: Boolean = false;
        this.chatsSinLeer.forEach(chat => {
          if (chat == data.mensaje.chat)
            enc = true;
        })

        if (!enc)
          this.chatsSinLeer.push(data.mensaje.chat);
      }

      else if (data.topic == "chatLeido"){
        this.chatsSinLeer.forEach(chat =>{
          if (chat == data.chatid){
            let i = this.chatsSinLeer.indexOf(chat);
            this.chatsSinLeer.splice(i, 1);
          }
        })
      }

      else if (data.topic == "updateUser"){
        this.chatService.getChatsSinLeer().subscribe(data => {
          this.chatsSinLeer = data;
        })
      }

      else if (data.topic == "borrarChat"){
        this.chatsSinLeer.forEach(chat =>{
          if (chat == data.chat){
            let i = this.chatsSinLeer.indexOf(chat);
            this.chatsSinLeer.splice(i, 1);
          }
        })
      }
    })
  }

  ionViewDidEnter(){
    if (this.chatService.name != undefined)
      this.router.navigate(['/chat/grupo/' + this.chatService.name]);
  }
}
