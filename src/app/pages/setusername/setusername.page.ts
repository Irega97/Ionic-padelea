import { Token } from './../../models/token';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-setusername',
  templateUrl: './setusername.page.html',
  styleUrls: ['./setusername.page.scss'],
})
export class SetusernamePage implements OnInit {

  usernameForm: FormGroup;
  isSubmitted = false;
  name;
  email;
  image;
  provider;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.name = this.router.getCurrentNavigation().extras.state.name;
    this.provider = this.router.getCurrentNavigation().extras.state.provider;
    this.email = this.router.getCurrentNavigation().extras.state.email;
    this.image = this.router.getCurrentNavigation().extras.state.image;

    console.log(this.name, this.email, this.provider, this.image);
  }

  ngOnInit() {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.nullValidator]]
    });
  }
  get formControls(){
    return this.usernameForm.controls;
  }

  submitUsername() {
    const user = {
      name: this.name,
      email: this.email,
      image: this.image,
      provider: this.provider,
      online: true,
      password: null,
      username: this.usernameForm.value.username,
      friends: []
    };
    console.log(user);
    this.authService.register(user).subscribe((jwt: Token) => {
      localStorage.setItem('ACCESS_TOKEN', jwt.token);
      this.router.navigateByUrl('/principal');
    });
  }

}
