import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ChatService } from 'src/app/services/chat.service';
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  name: string;
  type: string;
  chat;
  cargando: Boolean = true;
  admin: Boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private chatService: ChatService, private userService: UserService, 
    private components: ComponentsService, private events: EventsService, private socket: Socket) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.chat =  this.router.getCurrentNavigation().extras.state.chat;
      this.name = this.chat.name;
      this.cargando = false;
      this.chat.users.sort((a,b) => {
        if (a.username > b.username)
          return -1
          
        else if (a.username < b.username)
          return 1

        else
          return 0;
      });

      this.chat.users.forEach(user => {
        let i: number = 0;
        let enc: Boolean = false;
        while (i < this.chat.admin.length && !enc){
          if (user._id == this.chat.admin[i])
            enc = true;

          if (this.userService.user._id == this.chat.admin[i])
            this.admin = true;
          i++;
        }
        user.isAdmin = enc;
      })
    }

    else{
      this.type = this.router.url.split('/')[2];
      this.route.paramMap.subscribe(paramMap => {
        this.name = paramMap.get('name');
        let info = {
          "tipo": this.type,
          "name": this.name
        }

        this.chatService.getChat(info).subscribe(data => {
          this.chat = data.chat.chat;
          this.chat.users.sort((a,b) => {
            if (a.username > b.username)
            return -1
            
          else if (a.username < b.username)
            return 1
  
          else
            return 0;
          });
          this.chat.users.forEach(user => {
            let i: number = 0;
            let enc: Boolean = false;
            while (i < this.chat.admin.length && !enc){
              if (user._id == this.chat.admin[i])
                enc = true;

              if (this.userService.user._id == this.chat.admin[i])
                this.admin = true;
              i++;
            }
            user.isAdmin = enc;
          })
          this.name = this.chat.name;
          this.cargando = false;
        }, error => {
          if (error.status == 409)
            this.router.navigate(['principal/chats']);
        })
      }); 
    }

    this.events.getObservable().subscribe(data => {
      if (data.topic == "nuevoAdmin" && data.info.chat == this.chat._id){
        this.chat.users.forEach(user => {
          if (user._id == data.info.admin)
            user.isAdmin = true;
        })
        if (this.userService.user._id == data.info.admin)
        this.admin = true;
      }
    })

    this.socket.on('abandonopart', chat => {
      if (chat.chat == this.chat._id)
        this.chat.users.forEach(user => {
          if (user._id == chat.user){
            this.chat.users.splice(this.chat.users.indexOf(user), 1);
          }
        })
    })
  }

  hacerAdmin(user){
    let info = {
      user: user,
      admin: this.userService.user.username
    }
    this.chatService.addAdmin(this.chat._id, info).subscribe(() => {
      user.isAdmin = true;
      this.chat.admin.push(user);
    })
  }

  abandonarGrupo(){
    if (this.admin && this.chat.admin.length == 1)
      this.components.presentAlert("Eres el único administrador del grupo. Antes de abandonar el grupo debes elegir a otro admin");

    else{
      this.chatService.abandonarChat(this.chat._id).subscribe(data => {
        this.components.presentAlert("Has abandonado el chat");
        this.events.publish({
          "topic": "borrarChat",
          "chat": this.chat._id
        })

        this.router.navigate(['principal/chats']);
      })
    }
  }

  /*addParticipante(){
    console.log("Adelante");
  }*/
}
