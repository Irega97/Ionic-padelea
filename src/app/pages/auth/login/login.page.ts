import { Token } from './../../../models/token';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  error: string;
  pulsado: Boolean

  passwordinput = 'password';
  iconpassword = "eye-off";


  constructor(private formBuilder: FormBuilder, private router: Router, private authservicio: AuthService, private socialAuth: SocialAuthService,
    private components: ComponentsService) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.error = "";
    this.pulsado = false;
  }

  ionViewWillEnter(){
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.error = "";
    this.pulsado = false;
  }

  login(){
    this.pulsado = true;
    if (this.loginform.invalid){
      this.error = "";
      return;
    }

    //this.components.presentLoading("Por favor espera...");
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;
    const user = {'username': username, 'password': this.authservicio.encryptPassword(password), 'provider':'formulario'};

    this.authservicio.login(user).subscribe((jwt: Token) => {
      this.authservicio.addToken(jwt.token);
      //this.components.dismissLoading();
      this.router.navigate(['/principal']);
    }, error =>{
      if (error.status == 404){
        //this.components.dismissLoading();
        this.error = "Este usuario no existe";
      }
      else if (error.status == 409){
        this.error = "La contraseña no es correcta";
      }
      else{
        //this.components.dismissLoading();
        this.components.presentAlert("No se ha podido conectar con el servidor");
      }
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

  }

  async loginGoogle(){
    let user;
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((googleUser) => {
      console.log("GOOGLE PROFILE: ", googleUser);
      user = googleUser;
    });

    this.authservicio.checkSocialAccount(user.email).subscribe(data => {
      if(data.value === true) { 
        const u = {"provider": user.provider, "email": user.email}
        this.authservicio.login(u).subscribe((jwt: Token) => {
          this.authservicio.addToken(jwt.token);
          this.router.navigateByUrl('/principal');
        }, error =>{
          if (error.status = 409){
            this.components.presentAlert("Este correo está registrado, pero no con la red social de Google");
          }
          else{
            this.components.presentAlert("No se ha podido conectar con el servidor");
          }
        });
      }
      else {
        let navigationExtras: NavigationExtras = {
          state: {
            name: user.name, email: user.email, provider: user.provider, image: user.photoUrl, nombre: user.firstName, apellidos: user.lastName
          }
        };
        this.router.navigate(['auth/registro/setusername'], navigationExtras);
      };
    }, error =>{
      if (error.status = 409){
        this.components.presentAlert("Este email está registrado, pero no con la red social de Facebook");
      }
      else{
        this.components.presentAlert("No se ha podido conectar con el servidor");
      }
      
    });
  }

  async loginFacebook(){
    let user;
    await this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((facebookUser) => {
      console.log("FACEBOOK PROFILE: ", facebookUser);
      user = facebookUser;
    });

    this.authservicio.checkSocialAccount(user.email).subscribe(data => {
      if(data.value === true) { 
        const u = {"provider": user.provider, "email": user.email}
        this.authservicio.login(u).subscribe((jwt: Token) => {
          this.authservicio.addToken(jwt.token);
          this.router.navigateByUrl('/principal');
        }, error =>{

        });
      }
      else {
        let navigationExtras: NavigationExtras = {
          state: {
            name: user.name, email: user.email, provider: user.provider, image: user.photoUrl, nombre: user.firstName, apellidos: user.lastName
          }
        };
        this.router.navigate(['auth/registro/setusername'], navigationExtras);
      };
    }, error =>{
      this.components.presentAlert("No se ha podido conectar con el servidor");
    });
  }

}
