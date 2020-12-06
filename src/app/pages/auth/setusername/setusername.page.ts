import { User } from 'src/app/models/user';
import { Token } from 'src/app/models/token';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.name = this.router.getCurrentNavigation().extras.state.name;
    this.provider = this.router.getCurrentNavigation().extras.state.provider;
    this.email = this.router.getCurrentNavigation().extras.state.email;
    this.image = this.router.getCurrentNavigation().extras.state.image;
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
    });
  }

}
