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

  passwordinput = 'password';
  confirmpasswordinput = 'password';
  iconpassword = "eye-off";
  iconconfirmpassword = "eye-off";


  constructor(private userService: UserService, private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.pulsado = false;
    this.userService.getMyUser().subscribe(data => {
      this.user = data;
      this.updateform = this.formBuilder.group({
        name: [this.user.name, [Validators.required, Validator.validUsername]],
        checkname: [],
        nombre: [this.user.firstName, Validators.required],
        apellidos: [this.user.lastName, Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        //image: ['', Validators.nullValidator],
        email: [this.user.email, [Validators.required, Validators.email, Validator.validEmail]],
        checkmail: []
      }, {validator: Validator.checkPassword});
  }, error =>{
    console.log(error);
  })
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.userService.getMyUser().subscribe(data => {
      this.user = data;
      this.updateform = this.formBuilder.group({
        name: [this.user.name, [Validators.required, Validator.validUsername]],
        checkname: [],
        nombre: [this.user.firstName, Validators.required],
        apellidos: [this.user.lastName, Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        //image: ['', Validators.nullValidator],
        email: [this.user.email, [Validators.required, Validators.email, Validator.validEmail]],
        checkmail: []
      }, {validator: Validator.checkPassword});
  }, error =>{
    console.log(error);
  })
  }

  update(){
    this.pulsado = true;
    if (this.updateform.invalid){
      return;
    }

    let user = {
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
    this.userService.update(user).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/principal/perfil']);
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
