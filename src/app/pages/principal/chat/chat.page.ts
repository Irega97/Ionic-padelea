import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  username;
  cargando: Boolean = true;

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      this.chatService.getChat("user", this.username).subscribe(data => {
        this.cargando = false;
      });
    });
  }
}