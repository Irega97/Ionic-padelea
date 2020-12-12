import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator'
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-setusername',
  templateUrl: './setusername.page.html',
  styleUrls: ['./setusername.page.scss'],
})
export class SetusernamePage implements OnInit {

  usernameForm: FormGroup;
  pulsado: Boolean = false;
  user;
  nombre: string;
  apellidos: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private components: ComponentsService, private events: EventsService) {
  }

  ngOnInit() {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
    });
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.user =  this.router.getCurrentNavigation().extras.state.user;
      console.log(this.user);
    }
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.usernameForm.reset();
  }

  submitUsername() {
    this.pulsado = true;
    if (this.usernameForm.invalid){
      return;
    }
    this.user.username = this.usernameForm.value.username;
    this.authService.register(this.user).subscribe((jwt: Token) => {
      this.authService.addToken(jwt.token);
      this.events.publish({
        "topic":"loginUser"
      })
      this.router.navigateByUrl('/principal');
    }, error => {
      if (error.status = 409){
        this.usernameForm.get('checkname').setValue(this.usernameForm.value.username);
        this.usernameForm.controls.username.setErrors({validUsername: true});
      }
    });
  }

  goLogin(){
    this.router.navigate(['/auth/login']);
  }
}
