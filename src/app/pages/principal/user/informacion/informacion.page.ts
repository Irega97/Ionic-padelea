import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  user;
  username: string;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.user =  this.router.getCurrentNavigation().extras.state.user;
    }

    else{
      this.route.paramMap.subscribe(paramMap => {
        this.username = paramMap.get('username');
        this.userService.getUser(this.username).subscribe(data =>{
          this.user = data;
        });
      });
    }
  }
}
