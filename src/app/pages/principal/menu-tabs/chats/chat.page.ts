import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = '';
  messages= []; 

  constructor( private eventService: EventsService ) { }

  ngOnInit() {
  }
}
