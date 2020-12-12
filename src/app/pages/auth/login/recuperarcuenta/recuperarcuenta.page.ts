import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from 'src/app/models/validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperarcuenta',
  templateUrl: './recuperarcuenta.page.html',
  styleUrls: ['./recuperarcuenta.page.scss'],
})
export class RecuperarcuentaPage implements OnInit {

  emailForm: FormGroup;
  pulsado: Boolean = false;
  constructor(private formBuilder: FormBuilder, private authservice: AuthService, private router: Router) { }

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
    this.authservice.checkemail(this.emailForm.value.email).subscribe(data =>{
      if (data.value == true){
        this.router.navigate(['/auth/login']);
      }
      else{
        this.emailForm.get('checkemail').setValue(this.emailForm.value.email);
        this.emailForm.controls.email.setErrors({validEmail: true});
      }
    })
  }

}
