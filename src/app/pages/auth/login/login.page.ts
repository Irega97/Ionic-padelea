import { Token } from './../../../models/token';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { Validator } from 'src/app/models/validator';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  pulsado: Boolean

  passwordinput = 'password';
  iconpassword = "eye-off";


  constructor(private formBuilder: FormBuilder, private router: Router, private authservicio: AuthService, private socialAuth: SocialAuthService,
    private components: ComponentsService, private events: EventsService) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkusername: [],
      password: ['', Validators.required]
    });
    this.pulsado = false;
  }

  ionViewWillEnter(){
    this.loginform.reset();
    this.pulsado = false;
  }

  login(){
    this.pulsado = true;
    if (this.loginform.invalid){
      return;
    }

    this.components.presentLoading("Conectando...").then(() => {
      const user = {'username': this.loginform.value.username, 'password': this.authservicio.encryptPassword(this.loginform.value.password), 'provider':'formulario'};
      this.authservicio.login(user).subscribe((jwt: Token) => {
        this.authservicio.addToken(jwt.token);
        this.events.publish({
          "topic":"loginUser"
        })
        this.components.dismissLoading();
        this.router.navigate(['/principal']);
      }, error =>{
        this.components.dismissLoading();
        if (error.status == 404){
          this.loginform.get('checkusername').setValue(this.loginform.value.username);
          this.loginform.controls.username.setErrors({validUsername: true});
        }
        else if (error.status == 409){
          this.loginform.get('password').setValue('');
          this.loginform.controls.password.setErrors({validUsername: true});
        }
      })
    })
  }

  goRegister(){
    this.router.navigate(['/auth/registro']);
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

  recuperarPassword(){
    this.router.navigate(['/auth/login/recuperarcuenta']);
  }

  async loginGoogle(){
    let user;
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((googleUser) => {
      user = googleUser;
    });

    this.components.presentLoading("Conectando...").then(() => {
      this.authservicio.checkemail(user.email).subscribe(data => {
        if(data.value === true) { 
          const u = {"provider": user.provider, "email": user.email};
          this.authservicio.login(u).subscribe((jwt: Token) => {
            this.authservicio.addToken(jwt.token);
            this.events.publish({
              "topic":"loginUser"
            });
            this.components.dismissLoading();
            this.router.navigateByUrl('/principal');
          }, error =>{
            this.components.dismissLoading();
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
          this.components.dismissLoading();
          this.router.navigate(['auth/registro/setusername'], navigationExtras);
        };
      });
    })
  }

  async loginFacebook(){
    let user;
    await this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((facebookUser) => {
      user = facebookUser;
    });

    this.components.presentLoading("Conectando...").then(() => {
      this.authservicio.checkemail(user.email).subscribe(data => {
        if(data.value === true) { 
          const u = {"provider": user.provider, "email": user.email};
          this.authservicio.login(u).subscribe((jwt: Token) => {
            this.authservicio.addToken(jwt.token);
            this.events.publish({
              "topic":"loginUser"
            });
            this.components.dismissLoading();
            this.router.navigateByUrl('/principal');
          }, error =>{
            this.components.dismissLoading();
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
          this.components.dismissLoading();
          this.router.navigate(['auth/registro/setusername'], navigationExtras);
        };
      });
    })
  }
}
