import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  name: string;
  type: string;
  chat;

  constructor(private router: Router, private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.name =  this.router.getCurrentNavigation().extras.state.chat.name;
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
          this.name = this.chat.name;
        })
      }); 
    }
  }
}
