import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validator } from 'src/app/models/validator'

@Component({
  selector: 'app-setusername',
  templateUrl: './setusername.page.html',
  styleUrls: ['./setusername.page.scss'],
})
export class SetusernamePage implements OnInit {

  usernameForm: FormGroup;
  isSubmitted = false;
  name: string;
  email: string;
  image: string;
  provider: string;
  pulsado: Boolean;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.name = this.router.getCurrentNavigation().extras.state.name;
    this.provider = this.router.getCurrentNavigation().extras.state.provider;
    this.email = this.router.getCurrentNavigation().extras.state.email;
    this.image = this.router.getCurrentNavigation().extras.state.image;
  }

  ngOnInit() {
    this.pulsado = false;
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
    });
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkname: [],
    });
  }

  submitUsername() {
    if (this.usernameForm.invalid){
      this.pulsado = true;
      return;
    }
    
    const user: User = {
      name: this.name,
      email: this.email,
      image: this.image,
      provider: this.provider,
      online: true,
      password: null,
      username: this.usernameForm.value.username,
      friends: []
    };

    this.authService.register(user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigateByUrl('/principal');
    }, error => {
      if (error.status = 409){
        this.usernameForm.get('checkname').setValue(this.usernameForm.value.username);
        this.usernameForm.controls.username.setErrors({validUsername: true});
      }
    });
  }

  goLogin(){
    this.router.navigate(['/auth/login']);
  }
}
