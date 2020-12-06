import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from 'src/app/models/token'
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  user;
  error: string;
  pulsado: Boolean

  passwordinput = 'password';
  iconpassword = "eye-off";


  constructor(private formBuilder: FormBuilder, private router: Router, private authservicio: AuthService, private socialAuth: SocialAuthService, 
              private loadingController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    if (this.authservicio.isLoggedIn()){
      this.router.navigate(['/principal']);
    }
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.error = "";
    this.pulsado = false;
  }

  ionViewWillEnter(){
    if (this.authservicio.isLoggedIn()){
      this.router.navigate(['/principal']);
    }
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.error = "";
    this.pulsado = false;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor espera...'
    });
    await loading.present();
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      message: "No se ha podido conectar con el servidor",
      buttons: ['OK']
    })
    await alert.present();
  }

  login(){
    this.pulsado = true;
    if (this.loginform.invalid){
      this.error = "";
      return;
    }
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;
    const user = {'username': username, 'password': this.authservicio.encryptPassword(password), 'provider':'formulario'};

    this.authservicio.login(user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      //this.loadingController.dismiss();
      this.router.navigate(['/principal']);
    }, error =>{
      if (error.status == 404){
        //this.loadingController.dismiss();
        this.error = "Este usuario no existe";
      }
      else{
        //this.loadingController.dismiss();
        this.presentAlert();
      }
    })
  }

  goRegister(){
    this.router.navigate(['/registro']);
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
    let u;
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((user) => {
      console.log("GOOGLE PROFILE: ", user);
      u = {"provider": user.provider, "email": user.email}
      /* this.user.provider = user.provider;
      this.user.email = user.email;  */
    });
    this.authservicio.login(u).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigateByUrl('/principal');
    });
  }

}
