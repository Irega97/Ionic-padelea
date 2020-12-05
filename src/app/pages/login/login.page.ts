import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from 'src/app/models/token'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: FormGroup;
  user: User;
  error: string;
  pulsado: Boolean

  passwordinput = 'password';
  iconpassword = "eye-off";


  constructor(private formBuilder: FormBuilder, private router: Router, private authservicio: AuthService, private socialAuth: SocialAuthService) { }

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

  login(){
    this.pulsado = true;
    if (this.loginform.controls.username.invalid){
      return;
    }

    this.user = new User (this.loginform.value.username, this.authservicio.encryptPassword(this.loginform.value.password), "formulario");


    this.authservicio.login(this.user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigate(['/principal']);
    }, error =>{
      if (error.status == 404){
        this.error = "Este usuario no existe";
      }
      else{
        this.error = "No se ha podido conectar con el servidor";
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
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((user) => {
      console.log("GOOGLE PROFILE: ", user);
      this.user = new User("","", user.provider, "", user.email );
    });
    this.authservicio.login(this.user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigateByUrl('/principal');
    });
  }

}
