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
    private components: ComponentsService) { }

  ngOnInit() {
    this.pulsado = false;
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', [Validators.required, Validator.checkPassword]],
      //image: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email, Validator.validEmail]],
      checkmail: []
    });
  }

  ionViewWillEnter(){
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      //image: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email, Validator.validEmail]],
      checkmail: []
    }, {validator: Validator.checkPassword});
    this.pulsado = false;
  }

  register(){
    this.pulsado = true;
    if (this.registerform.invalid){
      return;
    }

    let nombre = this.registerform.value.nombre + " " + this.registerform.value.apellidos;
    let user = {
      name : nombre,
      firstName: this.registerform.value.nombre,
      lastName: this.registerform.value.apellidos,
      username: this.registerform.value.name,
      provider: 'formulario',
      email: this.registerform.value.email,
      online: true,
      public: true,
      image: config.defaultImage,
      password: this.authservicio.encryptPassword(this.registerform.value.password),
      friends: []
    }
    this.authservicio.register(user).subscribe((jwt: Token) => {
      this.authservicio.addToken(jwt.token);
      this.router.navigate(['/principal']);
    }, error => {
      if (error.status == 409){
        this.registerform.get('checkname').setValue(this.registerform.value.name);
        this.registerform.controls.name.setErrors({validUsername: true});
      }
      else if (error.status == 410){
        this.registerform.get('checkmail').setValue(this.registerform.value.email);
        this.registerform.controls.name.setErrors({validEmail: true});
      }
    });
  }

  goLogin(){
    this.router.navigate(['/auth/login']);
  }

  async registerGoogle(){
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((user) => {
      console.log("GOOGLE PROFILE: ", user);
      this.authservicio.checkSocialAccount(user.email).subscribe(data => {
        if (!data.value){
          let navigationExtras: NavigationExtras = {
            state: {
              name: user.name, email: user.email, provider: user.provider, image: user.photoUrl, firstName: user.firstName, lastName: user.lastName
            }
          };
          this.router.navigate(['auth/registro/setusername'], navigationExtras);
        }
        else{
          const u = {"provider": user.provider, "email": user.email}
          this.authservicio.login(u).subscribe((jwt: Token) => {
            this.authservicio.addToken(jwt.token);
            this.router.navigateByUrl('/principal');
          });
        }
      })
    });
  }

  async registerFacebook(){
    await this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((user) => {
      console.log("FACEBOOK PROFILE: ", user);
      this.authservicio.checkSocialAccount(user.email).subscribe(data => {
        if (!data.value){
          let navigationExtras: NavigationExtras = {
            state: {
              name: user.name, email: user.email, provider: user.provider, image: user.photoUrl, firstName: user.firstName, lastName: user.lastName
            }
          };
          this.router.navigate(['auth/registro/setusername'], navigationExtras);
        }
        else{
          const u = {"provider": user.provider, "email": user.email}
          this.authservicio.login(u).subscribe((jwt: Token) => {
            this.authservicio.addToken(jwt.token);
            this.router.navigateByUrl('/principal');
          });
        }
      })
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