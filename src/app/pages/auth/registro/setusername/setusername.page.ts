import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validator } from 'src/app/models/validator'
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-setusername',
  templateUrl: './setusername.page.html',
  styleUrls: ['./setusername.page.scss'],
})
export class SetusernamePage implements OnInit {

  usernameForm: FormGroup;
  pulsado: Boolean;
  user: User;
  correcto: Boolean = false;
  nombre: string;
  apellidos: string;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private router: Router,
    private components: ComponentsService) {
  }

  ngOnInit() {
    this.pulsado = false;
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
    });
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.user = {
        name: this.router.getCurrentNavigation().extras.state.name,
        firstName: this.router.getCurrentNavigation().extras.state.firstName,
        lastName: this.router.getCurrentNavigation().extras.state.lastName,
        email: this.router.getCurrentNavigation().extras.state.email,
        image: this.router.getCurrentNavigation().extras.state.image,
        provider: this.router.getCurrentNavigation().extras.state.provider,
        online: true,
        public: true,
        password: null,
        username: null,
        friends: []
      };
      this.correcto = true;
    }
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
    });
  }

  submitUsername() {
    this.pulsado = true;
    if (this.usernameForm.invalid){
      return;
    }
    this.user.username = this.usernameForm.value.username;
    this.authService.register(this.user).subscribe((jwt: Token) => {
      this.authService.addToken(jwt.token);
      this.router.navigateByUrl('/principal');
    }, error => {
      if (error.status = 409){
        this.usernameForm.get('checkname').setValue(this.usernameForm.value.username);
        this.usernameForm.controls.username.setErrors({validUsername: true});
      }
      else{
        this.components.presentAlert("No se ha podido conectar con el servidor")
      }
    });
  }

  goLogin(){
    this.router.navigate(['/auth/login']);
  }
}
