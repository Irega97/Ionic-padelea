import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
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
  participantes: string[];

  constructor(private route: ActivatedRoute, private chatService: ChatService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.type = this.router.url.split('/')[2];
    this.route.paramMap.subscribe(paramMap => {
      this.name = paramMap.get('name');
      let info = {
        "tipo": this.type,
        "name": this.name
      }
      this.chatService.getChat(info).subscribe(data => {
        this.image = data.image;
        this.linea = data.online
        this.cargando = false;
        console.log(data);
      });
    });
  }

  sendMessage(){
    if (this.nuevo){
      this.participantes.push(this.userService.user.username);
      this.participantes.push(this.name);
      this.chatService.addChat(this.participantes).subscribe(data =>{
        this.nuevo = false;
      })
    }
    //this.socket.emit('send-message', { text: this.message });
  }
}