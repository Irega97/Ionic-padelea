import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService} from 'src/app/services/auth.service'
import { Token } from 'src/app/models/token'
import { Validator } from 'src/app/models/validator'
import config from 'src/environments/config';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modperfil',
  templateUrl: './modperfil.page.html',
  styleUrls: ['./modperfil.page.scss'],
})
export class ModperfilPage implements OnInit {

  updateform: FormGroup;
  user: User;
  nombre: string;
  pulsado: Boolean;
  error;

  passwordinput = 'password';
  confirmpasswordinput = 'password';
  iconpassword = "eye-off";
  iconconfirmpassword = "eye-off";


  constructor(private userService: UserService,private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.pulsado = false;
    this.updateform = this.formBuilder.group({
      name: ['', [ Validator.validUsername]],
      checkname: [],
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      password: [''],
      confirmpassword: ['', [Validator.checkPassword]],
      //image: ['', Validators.nullValidator],
      email: ['', [Validator.validEmail]],
      checkmail: []
    });

    this.userService.getMyUser().subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

  ionViewWillEnter(){
    this.updateform = this.formBuilder.group({
      name: ['', [Validator.validUsername]],
      checkname: [],
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      password: [''],
      confirmpassword: ['', [Validator.checkPassword]],
      //image: ['', Validators.nullValidator],
      email: ['', [Validator.validEmail]],
      checkmail: []
    });
    this.pulsado = false;
  }

  update(){
    this.pulsado = true;
    if (this.updateform.invalid){
      return;
    }

    let user = {
      /* name: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    image: string;
    email: string;
    online : boolean;
    public: boolean;
    provider: string;
    friends: User[]; */
      name : this.updateform.value.nombre,
      firstName: this.updateform.value.apellido1,
      lastName: this.updateform.value.apellido2,
      username: this.updateform.value.name,
      provider: 'formulario',
      email: this.updateform.value.email,
      online: true,
      public: true,
      image: config.defaultImage,
      password: this.authservicio.encryptPassword(this.updateform.value.password),
      friends: []
    }
    this.authservicio.register(user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigate(['/auth/perfil']);
    }, error => {
      if (error.status = 409){
        this.updateform.get('checkname').setValue(this.updateform.value.name);
        this.updateform.controls.name.setErrors({validUsername: true});
      }
      else if (error.status = 410){
        this.updateform.get('checkmail').setValue(this.updateform.value.email);
        this.updateform.controls.name.setErrors({validEmail: true});
      }
      console.log(error);
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
