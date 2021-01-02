import { Component, OnInit } from '@angular/core';
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
  constructor(private chatService: ChatService, private events: EventsService, private userService: UserService) { }

  ngOnInit() {
    this.chatService.getChatsSinLeer().subscribe(data => {
      this.chatsSinLeer = data;
    })

    this.events.getObservable().subscribe(data=>{
      if (data.topic == "nuevoChat"){
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
    })
  }
}
