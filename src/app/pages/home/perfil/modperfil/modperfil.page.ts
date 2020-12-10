import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService} from 'src/app/services/auth.service'
import { Validator } from 'src/app/models/validator'
import { UserService } from 'src/app/services/user.service';
import { RefreshService } from 'src/app/services/refresh.service';

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
  providerform: Boolean;

  passwordinput = 'password';
  confirmpasswordinput = 'password';
  iconpassword = "eye-off";
  iconconfirmpassword = "eye-off";

  constructor(private userService: UserService, private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router,
    private events: RefreshService) { }

  ngOnInit() {
    this.pulsado = false;
    this.userService.getMyUser().subscribe(data => {
      this.user = data;
      if (this.user.provider == "formulario"){
        this.updateform = this.formBuilder.group({
          name: [this.user.username, [Validators.required, Validator.validUsername]],
          checkname: [],
          nombre: [this.user.firstName, Validators.required],
          apellidos: [this.user.lastName, Validators.required],
          password: ['', Validators.required],
          confirmpassword: ['', Validators.required],
          //image: ['', Validators.nullValidator],
          email: [this.user.email, [Validators.required, Validators.email, Validator.validEmail]],
          checkmail: []
        }, {validator: Validator.checkPassword});
        this.providerform = true;
      }
      else{
        this.updateform = this.formBuilder.group({
          name: [this.user.username, [Validators.required, Validator.validUsername]],
          checkname: [],
          //image: ['', Validators.nullValidator],
          nombre: [this.user.firstName, Validators.required],
          apellidos: [this.user.lastName, Validators.required]
        })
        this.providerform = false;
      }
      
  }, error =>{
    console.log(error);
  })
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.userService.getMyUser().subscribe(data => {
      this.user = data;
      if (this.user.provider == "formulario"){
        this.updateform = this.formBuilder.group({
          name: [this.user.username, [Validators.required, Validator.validUsername]],
          checkname: [],
          nombre: [this.user.firstName, Validators.required],
          apellidos: [this.user.lastName, Validators.required],
          password: [''],
          confirmpassword: [''],
          //image: ['', Validators.nullValidator],
          email: [this.user.email, [Validators.required, Validators.email, Validator.validEmail]],
          checkmail: []
        }, {validator: Validator.checkPassword});
        this.providerform = true;
      }
      else{
        this.updateform = this.formBuilder.group({
          name: [this.user.username, [Validators.required, Validator.validUsername]],
          checkname: [],
          //image: ['', Validators.nullValidator],
          nombre: [this.user.firstName, Validators.required],
          apellidos: [this.user.lastName, Validators.required]
        })
        this.providerform = false;
      }
      
  }, error =>{
    console.log(error);
  })
  }

  update(){
    this.pulsado = true;
    if (this.updateform.invalid){
      return;
    }
    let nombre = this.updateform.value.nombre + " " + this.updateform.value.apellidos;
    let userupdate = { 
      name: nombre, 
      firstName: this.updateform.value.nombre, 
      lastName: this.updateform.value.nombre, 
      username: this.updateform.value.name,
      image: this.user.image, 
      email: this.user.email,
      password: "",
      online: true,
      public: true,
      provider: this.user.provider,
      friends: null
    };
    if (this.user.provider == "formulario"){
      userupdate.email = this.updateform.value.email;
      if (this.updateform.value.password != ''){
        userupdate.password = this.authservicio.encryptPassword(this.updateform.value.password);
      }
    }

    this.userService.update(userupdate).subscribe((data) => {
      console.log("Update de: ", data);
      this.events.publish({
        "topic": "updateUser",
        "user": userupdate
    });
      this.router.navigate(['/principal']);
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
