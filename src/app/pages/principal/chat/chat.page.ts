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
  idnuevomensaje: string;

  @ViewChild(IonInfiniteScroll) 
  infiniteScroll: IonInfiniteScroll;

  @ViewChild('content') 
  private content;

  private contentinBottom:Boolean = false;

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
        this.chat.mensajes.push(data.mensaje.mensaje);
        if (this.messages[this.messages.length - 1] != data.mensaje.mensaje)
          this.messages.push(data.mensaje.mensaje);
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
            this.chat.mensajes[i].leidos.push(info.user);
            i++;
          }

          i = 1;
          while (this.chat.mensajes.length - i >= info.ultimoleido){
            if (this.messages[this.messages.length - i].sender == this.userService.user.username && this.chat.mensajes[this.chat.mensajes.length - i].leidos.length == this.chat.users.length){
              this.messages[this.messages.length - i].icon = "checkmark-done-outline";
            }
            
            i++;
            if (this.messages.length - i < 0)
              i = this.chat.mensajes.length + 1;
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
          this.infiniteScroll.disabled = true;
        }
        
        else{
          this.nuevo = false;
          this.chat = data.chat.chat;
          this.ultimoleido = data.chat.ultimoleido;
          if (data.chat.chat.mensajes.length < 20){
            this.messages = data.chat.chat.mensajes;
            this.infiniteScroll.disabled = true;

            if (this.ultimoleido < this.chat.mensajes.length){
              let messageconf = {
                "body": "Nuevos Mensajes",
                "id": "nuevomensaje"
              }

              this.idnuevomensaje = "nuevomensaje";
              this.messages.splice(this.ultimoleido, 0, messageconf);
              this.ultimoleido = this.chat.mensajes.length;
              this.noleidos = true;
                this.events.publish({
                  "topic": "chatLeido",
                  "chatid": data.chat.chat._id 
                })
            }
          }

          else{
            if (this.ultimoleido == this.chat.mensajes.length){
              let i: number = 20;
              while (i > 0){
                this.messages.push(data.chat.chat.mensajes[data.chat.chat.mensajes.length - i]);
                i--;
              }
            }
            
            else{
              let messageconf = {
                "body": "Nuevos Mensajes",
                "id": "nuevomensaje"
              }

              this.idnuevomensaje = "nuevomensaje";
              if (this.ultimoleido == 0){
                this.messages = data.chat.chat.mensajes;
                this.messages.splice(0, 0, messageconf);
              }
              
              else{
                let i: number = 0;
                while (i < 5 && this.ultimoleido - i > 0){
                  this.messages.push(data.chat.chat.mensajes[this.ultimoleido - i]);
                  i++;
                }

                this.messages.push(messageconf);
                while (this.ultimoleido < data.chat.chat.mensajes.length){
                  this.messages.push(this.chat.mensajes[this.ultimoleido]);
                  this.ultimoleido++;
                }

                if (this.messages.length < 20){
                  i = 20 - this.messages.length;
                  while (i < 20){
                    this.messages.splice(0, 0, data.chat.chat.mensajes[data.chat.chat.mensajes.length - i]);
                    i++;
                  }
                }
                else if (this.messages.length > this.chat.mensajes.length)
                  this.infiniteScroll.disabled = true;
              }
              
              this.noleidos = true;
              this.events.publish({
                "topic": "chatLeido",
                "chatid": data.chat.chat._id 
              })
            }
          }

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
    if (!this.leer){
      if (this.ultimoleido < this.messages.length){
        let messageconf = {
          "body": "Nuevos Mensajes",
          "id": "nuevomensaje"
        }

        this.idnuevomensaje = "nuevomensaje";
        this.messages.splice(this.ultimoleido, 0, messageconf);
        this.noleidos = true;
        let info = {
          chat: this.chat._id,
          user: this.userService.user._id,
          ultimoleido: this.ultimoleido
        }

        this.socket.emit('mensajeLeido', info);
        this.events.publish({
          "topic": "chatLeido",
          "chatid": this.chat._id
        })
        this.ultimoleido = this.messages.length;
      }
    }
    this.leer = true;
  }

  ionViewDidEnter(){
    if (!this.noleidos){
      this.content.scrollToBottom(100);
      this.contentinBottom = true;
    }

    else{
        let y = document.getElementById(this.idnuevomensaje).offsetTop;
        this.content.scrollByPoint(0, y, 100);
    }
  }

  ionViewDidLeave(){
    this.leer = false;
  }

  scrollToBottom(){
    this.content.scrollToBottom(100);
  }

  async checkBottom(event) {
    const scrollElement = await event.target.getScrollElement();
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const currentScrollDepth = event.detail.scrollTop;

    if (scrollHeight > currentScrollDepth + 10)
      this.contentinBottom = false;

    else
      this.contentinBottom = true;
  }

  loadData(event){
    if (this.messages.length < this.chat.mensajes.length){
      setTimeout(() => {
        let i: number = 0;
        let pos: number = this.chat.mensajes.length - this.messages.length - i;
        if (this.messages.length + 15 >= this.chat.mensajes.length){
          while (pos >= 0){
            this.messages.splice(0, 0, this.chat.mensajes[pos]);
            if (this.messages[0].sender == this.userService.user.username && this.messages[0].leidos.length == this.chat.users.length)
              this.messages[0].icon = "checkmark-done-outline"

            else if (this.messages[0].sender == this.userService.user.username)
            this.messages[0].icon = "checkmark-outline"
            pos--;
          }

          this.infiniteScroll.disabled = true;
        }

        else{
          while (i < 15){
            this.messages.splice(0, 0, this.chat.mensajes[pos]);
            if (this.messages[0].sender == this.userService.user.username && this.messages[0].leidos.length == this.chat.users.length)
              this.messages[0].icon = "checkmark-done-outline"

            else if (this.messages[0].sender == this.userService.user.username)
            this.messages[0].icon = "checkmark-outline"
            i++;
            pos--;
          }
        }
        event.target.complete();
      }, 500);
    }
  }

  goConf(){
    let navigationExtras: NavigationExtras = {
      state: {
        chat: this.chat
      }
    };
    if(this.type=="grupo") 
      this.router.navigate(['chat/grupo/' + this.name + '/informacion'], navigationExtras);
  }

  enviarMensaje(event){
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
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
      
      this.message = "";
      if (this.nuevo){
        let info = {
          users: this.participantes,
          mensaje: messageToSend,
        };

        this.messages.push(messageToSend);
        this.messages[0].icon = "time-outline";
        this.chatService.addChat(info).subscribe(data =>{
          this.nuevo = false;
          this.chat = data;
          this.ultimoleido = 1;
          this.messages = this.chat.mensajes;
          this.messages[0].icon = "checkmark-outline";
        })
      }
      
      else{
        if (this.noleidos){
          this.messages.forEach(mensaje => {
            if (mensaje.sender == undefined && mensaje.body == "Nuevos Mensajes"){
              let i = this.messages.indexOf(mensaje);
              this.messages.splice(i, 1);
              this.idnuevomensaje = undefined;
            }
          })
        }

        this.chat.mensajes.push(messageToSend);
        if (this.messages[this.messages.length - 1] != messageToSend)
          this.messages.push(messageToSend);

        this.messages[this.messages.length - 1].icon = "time-outline";
        this.chatService.sendMessage(this.chat._id, messageToSend).subscribe(() => {
          this.content.scrollToBottom(100);
          let enc: Boolean = false;
          let i: number = 1;
          while (i < this.messages.length && !enc){
            if (this.messages[this.messages.length - i]. sender == this.userService.user.username){
              if (this.messages[this.messages.length - i].icon == "time-outline")
                this.messages[this.messages.length - i].icon = "checkmark-outline";
              enc = true;
            }

            else
              i++;
          }
        })
      }
    }
  }
}