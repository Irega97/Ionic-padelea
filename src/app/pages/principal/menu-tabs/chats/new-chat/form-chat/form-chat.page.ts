import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator'
import { UserPageRoutingModule } from 'src/app/pages/principal/user/user-routing.module';
import { ChatService } from 'src/app/services/chat.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-form-chat',
  templateUrl: './form-chat.page.html',
  styleUrls: ['./form-chat.page.scss'],
})
export class FormChatPage implements OnInit {

  participantes;
  chatForm: FormGroup;
  pulsado: Boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private components: ComponentsService, private chatService: ChatService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.participantes =  this.router.getCurrentNavigation().extras.state.participantes;
    }

    this.chatForm = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkusername: []
    });
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.chatForm.reset();
  }

  submitChat(){
    this.pulsado = true;
    if (this.chatForm.invalid){
      return;
    }

    this.components.presentLoading("Conectando...").then(() => {
      let usersToSend: string[] = [];
      this.participantes.forEach(participante=>{
        usersToSend.push(participante._id);
      });
      let info = {
        users: usersToSend,
        name: this.chatForm.value.username,
        admin: [usersToSend[0]],
        image: 'https://res.cloudinary.com/dyjz5e9a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1606479202/default%20images/default_ktlol4.png',
        mensaje: {
          body: this.participantes[0].username + " ha creado el grupo",
          leidos: [this.participantes[0]._id]
        }
      }

      this.chatService.addChat(info).subscribe(data => {
        this.components.dismissLoading();
        this.router.navigate(['/chat/grupo/' + data.name]);
      }, error => {
        this.components.dismissLoading();
        if (error.status == 409){
          this.chatForm.get('checkusername').setValue(this.chatForm.value.username);
          this.chatForm.controls.username.setErrors({validUsername: true});
        }
      })
    });
  }
}
