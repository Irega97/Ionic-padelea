import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService} from 'src/app/services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerform: FormGroup;
  user: User;

  passwordinput = 'password';
  iconpassword = "eye-off";


  constructor(private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.nullValidator]],
      sex: ['', [Validators.required, Validators.nullValidator]],
      image: ['', Validators.nullValidator],
      email: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  register(){
    if(this.registerform.invalid){
      console.log("Debes rellenar todos los campos")
      return;
    }

    this.user = new User (this.registerform.value.name, this.registerform.value.password, this.registerform.value.sex, this.registerform.value.image, this.registerform.value.email);
    console.log("Nombre de Usuario: " + this.user.name);
    console.log("Password: " + this.user.password);
    console.log("Sex: " + this.user.sex);
    console.log("Email: " + this.user.email);
    this.authservicio.register(this.user).subscribe(data => {
      console.log(data);
      this.router.navigate(['/principal']);
    }, error => {
      console.log(error);
    });
  }

  goLogin(){
    this.router.navigate(['/login']);
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