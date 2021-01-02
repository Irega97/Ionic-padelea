import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  name: string;
  type: string;
  cargando: Boolean = true;
  nuevo: Boolean = true;
  image;
  linea: Boolean = false;
  participantes: string[] = [];
  messages: any[] = [];
  message = "";
  usernameactual: string;
  idChat: string;
  noleidos: Boolean = false;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router, private userService: UserService, private events: EventsService) { }

  ngOnInit() {
    if (this.userService.user != undefined)
      this.usernameactual = this.userService.user.username;

    this.events.getObservable().subscribe(data => {
      if (data.topic == "updateUser")
        this.usernameactual = this.userService.user.username;
      
      else if (data.topic == "actConectado" && this.type == "user" && this.name == data.user.user)
        this.linea = data.user.estado;
      
      else if (data.topic == "nuevoMensaje" && data.mensaje.chat == this.idChat && data.mensaje.mensaje.sender != this.usernameactual){
        this.messages.push(data.mensaje.mensaje);
      }
    })

    this.type = this.router.url.split('/')[2];
    this.route.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
      let info = {
        "tipo": this.type,
        "name": this.name
      }

      this.chatService.getChat(info).subscribe(data => {
        if (!data.existe){
          this.image = data.user.image;
          this.linea = data.user.online;
          this.participantes.push(this.userService.user._id);
          this.participantes.push(data.user._id);
        }
        else{
          this.nuevo = false;
          this.participantes = data.chat.chat.users;
          this.messages = data.chat.chat.mensajes;
          this.messages.forEach(mensaje => {
            if (mensaje.sender == this.userService.user.username){
              if (mensaje.leidos.length == this.participantes.length)
                mensaje.icon = "checkmark-done-outline";
              
                else
                  mensaje.icon = "checkmark-outline";
            }
          })
          this.idChat = data.chat.chat._id;
          data.chat.chat.users.forEach(user =>{
            if (user.username == this.name){
              this.image = user.image;
              this.linea = user.online;
            }
          })
          if (data.ultimoleido < data.chat.chat.mensajes.length){
            let messageconf = {
              "sender": "conf",
              "body": "Nuevos Mensajes"
            }
            this.messages.splice(data.ultimoleido, 0, messageconf);
            this.noleidos = true;
              this.events.publish({
                "topic": "chatLeido",
                "chatid": data.chat.chat._id 
              })
          }
        }

        this.cargando = false;
      }, error =>{
        if (error.status == 409)
          this.router.navigate(['/principal/home']);
      });
    });
  }

  sendMessage(){
    if (this.message != ""){
      let vectorleido: string[] = [];
      vectorleido.push(this.userService.user._id);
      let messageToSend = {
        body : this.message,
        sender: this.userService.user.username,
        date: new Date(Date.now()),
        leidos: vectorleido,
      }
  
      let messageToSave = {
        body : this.message,
        sender: this.userService.user.username,
        date: new Date(Date.now()),
        leidos: vectorleido,
        icon: "time-outline"
      }
      this.messages.push(messageToSave);
      this.message = "";
      if (this.nuevo){
        let info = {
          users: this.participantes,
          mensaje: messageToSend,
        };
        this.chatService.addChat(info).subscribe(data =>{
          this.idChat = data._id;
          this.nuevo = false;
        })
      }
      else{
        if (this.noleidos){
          this.messages.forEach(mensaje => {
            if (mensaje.sender == "conf" && mensaje.body == "Nuevos Mensajes"){
              let i = this.messages.indexOf(mensaje);
              this.messages.splice(i, 1);
            }
          })
        }

        this.chatService.sendMessage(this.idChat, messageToSend).subscribe(() => {
          let i = this.messages.indexOf(messageToSave);
          this.messages[i].icon = "checkmark-outline"
        })
      }
    }
  }
}