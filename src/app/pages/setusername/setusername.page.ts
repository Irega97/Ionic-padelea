import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setusername',
  templateUrl: './setusername.page.html',
  styleUrls: ['./setusername.page.scss'],
})
export class SetusernamePage implements OnInit {

  usernameForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.nullValidator]]
    });
  }
  get formControls(){
    return this.usernameForm.controls;
  }

  submitUsername() {
    const username = this.usernameForm.value.username;
    this.userService.changeUsername(username).subscribe(() => {
      this.router.navigateByUrl('/principal');
    });
  }

}
