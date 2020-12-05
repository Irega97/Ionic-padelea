import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService} from 'src/app/services/auth.service'
import { Token } from 'src/app/models/token'
import { Validator } from 'src/app/models/validator'
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerform: FormGroup;
  user: User;
  errorpassword = false;
  nombre: string;

  passwordinput = 'password';
  confirmpasswordinput = 'password';
  iconpassword = "eye-off";
  iconconfirmpassword = "eye-off";


  constructor(private socialAuth: SocialAuthService,private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.nullValidator, Validator.validUsername]],
      nombre: ['', [Validators.required, Validators.nullValidator]],
      apellido1: ['', [Validators.required, Validators.nullValidator]],
      apellido2: [''],
      password: ['', [Validators.required, Validators.nullValidator]],
      confirmpassword: ['', [Validators.required, Validators.nullValidator]],
      //image: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email, Validators.nullValidator]],
    });
  }

  ionViewWillEnter(){
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.nullValidator, Validator.validUsername]],
      nombre: ['', [Validators.required, Validators.nullValidator]],
      apellido1: ['', [Validators.required, Validators.nullValidator]],
      apellido2: [''],
      password: ['', [Validators.required, Validators.nullValidator]],
      confirmpassword: ['', [Validators.required, Validators.nullValidator]],
      //image: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.email, Validators.nullValidator]],
    });
  }

  register(){

    if (this.registerform.value.password != this.registerform.value.confirmpassword){
      this.errorpassword = true;
      this.registerform.controls.confirmpassword.setErrors(Validators.nullValidator);
      return;
    }

    this.nombre = this.registerform.value.nombre + " " + this.registerform.value.apellido1 + " " + this.registerform.value.apellido2;
    this.user = new User (this.registerform.value.name, this.registerform.value.password, "formulario", this.nombre, this.registerform.value.email, true, /* this.registerform.value.image */);
    this.user.password = this.authservicio.encryptPassword(this.user.password);
    this.authservicio.register(this.user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigate(['/principal']);
    }, error => {
      if (error)
      this.registerform.controls.name.setErrors(Validator.validUsername);
      console.log(error);
    });
  }

  goLogin(){
    this.router.navigate(['/login']);
  }

  async registerGoogle(){
    await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    await this.socialAuth.authState.subscribe((user) => {
      console.log("GOOGLE PROFILE: ", user);
      this.user = new User("", null, user.provider, user.name, user.email, false, user.photoUrl);
    });
    this.authservicio.register(this.user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigateByUrl('/setusername');
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