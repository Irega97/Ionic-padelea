import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje';
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
  idparticipante: string;
  type: string;
  cargando: Boolean = true;
  nuevo: Boolean = true;
  image;
  linea: Boolean = false;
  participantes: string[] = [];
  messages: [] = [];
  message = "";
  usernameactual;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router, private userService: UserService, private events: EventsService) { }

  ngOnInit() {
    this.usernameactual == this.userService.user.username;
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
          this.idparticipante = data.user._id;
        }
        else{
          this.nuevo = false;
          data.chat.users.forEach(user =>{
            if (user.username == this.name){
              this.image = user.image;
              this.linea = user.online;
              this.idparticipante = user._id;
            }
          })
        }
        this.cargando = false;
      }, error =>{
        if (error.status == 409)
          this.router.navigate(['/principal/home']);
      });
    });

    this.events.getObservable().subscribe(data => {
      if (data.topic == "nuevoMensaje"){
        
      }
    })
  }

  sendMessage(){
    let vectorleido: string[] = [];
    vectorleido.push(this.userService.user._id);
    let messageToSend = {
      body : this.message,
      sender: this.userService.user.username,
      date: new Date(Date.now()),
      leidos: vectorleido
    }

    if (this.nuevo){
      this.participantes.push(this.userService.user._id);
      this.participantes.push(this.idparticipante);
      let info = {
        users: this.participantes,
        mensaje: messageToSend,
      };
      this.chatService.addChat(info).subscribe(data =>{
        this.nuevo = false;
        this.message = "";
      })
    }
    //this.socket.emit('send-message', { text: this.message });
  }
}