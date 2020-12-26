import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Validator } from 'src/app/models/validator';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-updperfil',
  templateUrl: './updperfil.page.html',
  styleUrls: ['./updperfil.page.scss'],
})
export class UpdperfilPage implements OnInit {

  updateform: FormGroup;
  user: User;
  pulsado: Boolean = false;
  providerform: Boolean;

  passwordinput = 'password';
  confirmpasswordinput = 'password';
  iconpassword = "eye-off";
  iconconfirmpassword = "eye-off";

  constructor(private userService: UserService, private authservicio: AuthService, private formBuilder: FormBuilder, private router: Router,
    private events: EventsService, private location: Location) { }

  ngOnInit() {
    console.log("cris tonti");
    if (this.userService.user != undefined){
      this.user = this.userService.user;
      this.crearFormulario();
    }

    this.events.getObservable().subscribe(data=>{
      if (data.topic == "updateUser"){
        this.user = data.user;
      }
    })
  }

  ionViewWillEnter(){
    this.pulsado = false;
  }

  goBack(){
    this.location.back();
  }

  crearFormulario(){
    if (this.user.provider == "formulario"){
      this.updateform = this.formBuilder.group({
        username: [this.user.username, [Validators.required, Validator.validUsername]],
        checkusername: [],
        nombre: [this.user.firstName, Validators.required],
        apellidos: [this.user.lastName, Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
        //image: ['', Validators.nullValidator],
        email: [this.user.email, [Validators.required, Validators.email, Validator.validEmail]],
        checkemail: [],
        private: [this.user.private]
      }, {validator: Validator.checkPassword});
      this.providerform = true;
    }
    else{
      this.updateform = this.formBuilder.group({
        username: [this.user.username, [Validators.required, Validator.validUsername]],
        checkusername: [],
        //image: ['', Validators.nullValidator],
        nombre: [this.user.firstName, Validators.required],
        apellidos: [this.user.lastName, Validators.required],
        private: [this.user.private]
      })
      this.providerform = false;
    }
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
      username: this.updateform.value.username,
      image: this.user.image, 
      email: this.user.email,
      password: "",
      private: this.updateform.value.private,
      provider: this.user.provider
    };
    if (this.user.provider == "formulario"){
      userupdate.email = this.updateform.value.email;
      if (this.updateform.value.password != ''){
        userupdate.password = this.authservicio.encryptPassword(this.updateform.value.password);
      }
    }

    this.userService.update(userupdate).subscribe(() => {
      this.userService.user.name = userupdate.name;
      this.userService.user.firstName = userupdate.firstName;
      this.userService.user.lastName = userupdate.lastName;
      this.userService.user.image = userupdate.image;
      this.userService.user.email = userupdate.email;
      this.userService.user.username = userupdate.username;
      this.userService.user.private = userupdate.private;
      this.events.publish({
        "topic": "updateUser",
        "user": this.userService.user
    });
      this.router.navigate(['/principal']);
    }, error => {
      if (error.status = 409){
        this.updateform.get('checkusername').setValue(this.updateform.value.username);
        this.updateform.controls.username.setErrors({validUsername: true});
      }
      else if (error.status = 410){
        this.updateform.get('checkemail').setValue(this.updateform.value.email);
        this.updateform.controls.email.setErrors({validEmail: true});
      }
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
