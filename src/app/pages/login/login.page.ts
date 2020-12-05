import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  passwordinput = 'password';
  iconpassword = "eye-off";


  constructor(private formBuilder: FormBuilder, private router: Router, private authservicio: AuthService) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
    this.error = "";
  }

  ionViewWillEnter(){
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.nullValidator]]
    });
    this.error = "";
  }

  login(){
    if(this.loginform.invalid){
      return;
    }

    this.user = new User (this.loginform.value.username, this.authservicio.encryptPassword(this.loginform.value.password), "formulario");
    console.log("Username: " + this.user.username);
    console.log("Password: " + this.user.password);


    this.authservicio.login(this.user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigate(['/principal']);
    }, error =>{
      console.log(error)
      this.error = "Este usuario no existe";
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

}
