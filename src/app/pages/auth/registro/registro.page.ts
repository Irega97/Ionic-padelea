import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService} from 'src/app/services/auth.service'
import { Token } from 'src/app/models/token'
import { Validator } from 'src/app/models/validator'
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import config from 'src/environments/config';
import { ComponentsService } from 'src/app/services/components.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerform: FormGroup;
  user: User;
  nombre: string;
  pulsado: Boolean;

  passwordinput = 'password';
  confirmpasswordinput = 'password';
  iconpassword = "eye-off";
  iconconfirmpassword = "eye-off";


  constructor(private socialAuth: SocialAuthService,private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router,
    private components: ComponentsService, private events: EventsService) { }

  ngOnInit() {
    this.pulsado = false;
    this.registerform = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkusername: [],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      //image: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email, Validator.validEmail]],
      checkemail: []
    }, { validator: Validator.checkPassword });
  }

  ionViewWillEnter(){
    this.registerform.reset();
    this.pulsado = false;
  }

  register(){
    this.pulsado = true;
    if (this.registerform.invalid){
      return;
    }
    
    //this.components.presentLoading("Conectando...");
    let nombre = this.registerform.value.nombre + " " + this.registerform.value.apellidos;
    let user = {
      name : nombre,
      firstName: this.registerform.value.nombre,
      lastName: this.registerform.value.apellidos,
      username: this.registerform.value.username,
      provider: 'formulario',
      email: this.registerform.value.email,
      online: false,
      public: true,
      image: config.defaultImage,
      password: this.authservicio.encryptPassword(this.registerform.value.password),
      friends: []
    }
    this.authservicio.register(user).subscribe((jwt: Token) => {
      this.authservicio.addToken(jwt.token);
      this.events.publish({
        "topic":"loginUser"
      })
      //this.components.dismissLoading()
      this.router.navigate(['/principal']);
    }, error => {
      //this.components.dismissLoading()
      if (error.status == 409){
        this.registerform.get('checkusername').setValue(this.registerform.value.username);
        this.registerform.controls.username.setErrors({validUsername: true});
      }
      else if (error.status == 410){
        this.registerform.get('checkemail').setValue(this.registerform.value.email);
        this.registerform.controls.email.setErrors({validEmail: true});
      }
    });
  }

  goLogin(){
    this.router.navigate(['/auth/login']);
  }

  async registerGoogle(){
    let user;
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((googleUser) => {
      user = googleUser;
    });

    this.authservicio.checkemail(user.email).subscribe(data => {
      if(data.value === true) { 
        const u = {"provider": user.provider, "email": user.email}
        this.authservicio.login(u).subscribe((jwt: Token) => {
          this.authservicio.addToken(jwt.token);
          this.events.publish({
            "topic":"loginUser"
          })
          this.router.navigateByUrl('/principal');
        }, error =>{
          if (error.status = 409){
            this.components.presentAlert("Este correo está registrado, pero no con la red social de Google");
          }
        });
      }
      else {
        let navigationExtras: NavigationExtras = {
          state: {
            user: user
          }
        };
        this.router.navigate(['auth/registro/setusername'], navigationExtras);
      };
    });
  }

  async registerFacebook(){
    let user;
    await this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((facebookUser) => {
      user = facebookUser;
    });

    this.authservicio.checkemail(user.email).subscribe(data => {
      if(data.value === true) { 
        const u = {"provider": user.provider, "email": user.email}
        this.authservicio.login(u).subscribe((jwt: Token) => {
          this.authservicio.addToken(jwt.token);
          this.events.publish({
            "topic":"loginUser"
          })
          this.router.navigateByUrl('/principal');
        }, error =>{
          if (error.status = 409){
            this.components.presentAlert("Este correo está registrado, pero no con la red social de Facebook");
          }
        });
      }
      else {
        let navigationExtras: NavigationExtras = {
          state: {
            user: user
          }
        };
        this.router.navigate(['auth/registro/setusername'], navigationExtras);
      };
    });
  }

  VistaPassword(){
    if (this.passwordinput == "password"){
      this.passwordinput = "text";
    }
    else{
      this.passwordinput = "password"
    }

    if (this.iconpassword == "eye-off"){
      this.iconpassword = "eye";
    }
    else{
      this.iconpassword = "eye-off";
    }
  }

  VistaConfirmPassword(){
    if (this.confirmpasswordinput == "password"){
      this.confirmpasswordinput = "text";
    }
    else{
      this.confirmpasswordinput = "password"
    }

    if (this.iconconfirmpassword == "eye-off"){
      this.iconconfirmpassword = "eye";
    }
    else{
      this.iconconfirmpassword = "eye-off";
    }
  }

}