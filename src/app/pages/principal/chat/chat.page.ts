import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
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
  noleidos: Boolean = false;
  ultimoleido: number;
  chat;
  leer: Boolean = true;

  @ViewChild(IonInfiniteScroll) 
  infiniteScroll: IonInfiniteScroll;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router, private userService: UserService, private events: EventsService,
    private socket: Socket) { }

  ngOnInit() {
    if (this.userService.user != undefined)
      this.usernameactual = this.userService.user.username;

    this.events.getObservable().subscribe(data => {
      if (data.topic == "updateUser")
        this.usernameactual = this.userService.user.username;
      
      else if (data.topic == "actConectado" && this.type == "user" && this.name == data.user.user)
        this.linea = data.user.estado;
      
      else if (data.topic == 'nuevoChat' && data.chat.admin.length == 0 && data.chat.mensajes[0].sender != this.usernameactual){
        if (data.chat.users[0].username == this.name || data.chat.users[1].username == this.name){
          this.messages = data.chat.mensajes;
          this.nuevo = false;
          this.chat = data.chat;
          this.ultimoleido = 1;

          let info = {
            chat: this.chat._id,
            user: this.userService.user._id,
            ultimoleido: 0
          }

          this.socket.emit('mensajeLeido', info);
          this.events.publish({
            "topic": "chatLeido",
            "chatid": this.chat._id
          })
        }
      }

      else if (data.topic == "nuevoMensaje" && data.mensaje.chat == this.chat._id && data.mensaje.mensaje.sender != this.usernameactual){
        this.messages.push(data.mensaje.mensaje);
        if (this.messages.length != this.chat.mensajes.length)
          this.chat.mensajes.push(data.mensaje.mensaje);
        if (this.leer){
          let info = {
            chat: this.chat._id,
            user: this.userService.user._id,
            ultimoleido: this.ultimoleido
          }

          this.socket.emit('mensajeLeido', info);
          this.ultimoleido++;
          this.events.publish({
            "topic": "chatLeido",
            "chatid": this.chat._id
          })
        }
      }
    })

    this.socket.on('mensajeLeido', info => {
      if (this.chat != undefined){
        if (info.chat == this.chat._id && info.user != this.userService.user._id){
          let i: number = info.ultimoleido;
          while (i < this.chat.mensajes.length){
            //this.chat.mensajes[i].leidos.push(info.user);
            this.messages[i].leidos.push(info.user);
            console.log("Chat", this.messages[i]);
            console.log("Users", this.chat.users);
            if (this.messages[i].leidos.length == this.chat.users.length){
              this.messages[i].icon = "checkmark-done-outline";
            }
            i++;
          }
        }
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
          this.chat = data.chat.chat;
          this.ultimoleido = data.chat.ultimoleido;
          this.messages = data.chat.chat.mensajes;

          if (this.ultimoleido < this.messages.length){
            let messageconf = {
              "body": "Nuevos Mensajes"
            }
            this.messages.splice(this.ultimoleido, 0, messageconf);
            this.noleidos = true;
            this.ultimoleido = this.messages.length;
            this.events.publish({
              "topic": "chatLeido",
              "chatid": data.chat.chat._id 
            })
          }
          /*if (data.chat.chat.mensajes.length < 10){
            this.messages = data.chat.chat.mensajes;
            this.infiniteScroll.disabled = true;
          }

          else{
            if (this.ultimoleido == this.chat.mensajes.length){
              let i: number = 10;
              while (i > 0){
                this.messages.push(data.chat.chat.mensajes[data.chat.chat.mensajes.length - i]);
                i--;
              }
            }
            
            else{
              let messageconf = {
                "body": "Nuevos Mensajes"
              }

              this.messages.push(messageconf);
              while (this.ultimoleido < data.chat.mensajes.length){
                this.messages.push(this.chat.mensajes[this.ultimoleido]);
                this.ultimoleido++;
              }

              this.noleidos = true;
              this.events.publish({
                "topic": "chatLeido",
                "chatid": data.chat.chat._id 
              })
            }
          }*/

          this.messages.forEach(mensaje => {
            if (mensaje.sender == this.userService.user.username){
              if (mensaje.leidos.length == this.chat.users.length)
                mensaje.icon = "checkmark-done-outline";
              
                else
                  mensaje.icon = "checkmark-outline";
            }
          })
          if (this.type == "user"){
            data.chat.chat.users.forEach(user =>{
              if (user.username == this.name){
                this.image = user.image;
                this.linea = user.online;
              }
            })
          }

          else{
            this.image = data.chat.chat.image;
            this.linea = false;
          }
        }

        this.cargando = false;
      }, error =>{
        if (error.status == 409)
          this.router.navigate(['/principal/home']);
      });
    });
  }

  ionViewWillEnter(){
    this.leer = true;
  }

  ionViewDidLeave(){
    this.leer = false;
  }

  /*loadData(event){
    if (this.messages.length < this.chat.mensajes.length){
      setTimeout(() => {
        for (let i = 0; i < 30; i++) {
          console.log("Funciona");
        }
  
        event.target.complete();
      }, 500);
    }
  }*/

  goConf(){
    let navigationExtras: NavigationExtras = {
      state: {
        chat: this.chat
      }
    };
    this.router.navigate(['chat/grupo/' + this.name + '/informacion'], navigationExtras);
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
          this.nuevo = false;
          this.chat = data;
          this.ultimoleido = 1;
          this.messages[0].icon = "checkmark-outline"
        })
      }
      else{
        if (this.noleidos){
          this.messages.forEach(mensaje => {
            if (mensaje.sender == undefined && mensaje.body == "Nuevos Mensajes"){
              let i = this.messages.indexOf(mensaje);
              this.messages.splice(i, 1);
            }
          })
        }

        this.chatService.sendMessage(this.chat._id, messageToSend).subscribe(() => {
          let i = this.messages.indexOf(messageToSave);
          this.messages[i].icon = "checkmark-outline";
          //this.chat.mensajes.push(messageToSend);
          /*if (this.messages.length != this.chat.mensajes.length)
            this.chat.mensajes.push(messageToSend);*/
        })
      }
    }
  }
}