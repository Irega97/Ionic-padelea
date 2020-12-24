import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-recuperarcuenta',
  templateUrl: './recuperarcuenta.page.html',
  styleUrls: ['./recuperarcuenta.page.scss'],
})
export class RecuperarcuentaPage implements OnInit {

  emailForm: FormGroup;
  pulsado: Boolean = false;
  constructor(private formBuilder: FormBuilder, private authservice: AuthService, private router: Router, private components: ComponentsService) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validator.validEmail]],
      checkemail: []
    });
  }

  ionViewWillEnter(){
    this.emailForm.reset();
    this.pulsado = false;
  }

  submitemail(){
    this.pulsado = true;
    if (this.emailForm.invalid){
      return;
    }
    
    this.components.presentLoading("Conectando...").then(() => {
      this.authservice.checkemail(this.emailForm.value.email).subscribe(data =>{
        this.components.dismissLoading();
        if (data.value == true){
          if (data.provider == "formulario"){
            this.components.presentAlert("Por ahora no disponemos de servicio para recuperarla");
          }
          else{
            this.components.presentAlert("Te has registrado usando una cuenta de " + data.provider + ". Prueba a iniciar sesión mediante " + data.provider);
          }
          this.router.navigate(['/auth/login']);
        }
        
        else{
          this.emailForm.get('checkemail').setValue(this.emailForm.value.email);
          this.emailForm.controls.email.setErrors({validEmail: true});
        }
      })
    })
  }
}
