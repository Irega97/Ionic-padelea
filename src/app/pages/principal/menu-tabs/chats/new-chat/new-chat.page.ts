import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {

  chatForm;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService, private router: Router,
    private components: ComponentsService, private events: EventsService)  { }

  ngOnInit() {
    this.chatForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    }); 
    
  }

  submitChat(){
    let data = {
      "name": this.chatForm.value.name
    }
    this.chatService.addChat(data).subscribe((data)=>{
      if(data != null) {
        this.components.presentAlert("Chat creado con éxito");
        this.router.navigateByUrl('principal/chat');
        this.events.publish({"topic":"new-chat"});
      }
    });
  }

}
