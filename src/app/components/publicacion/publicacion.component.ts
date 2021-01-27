import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {

  @Input()
  publicaciones;

  constructor(private userService: UserService, private publicacionesService: PublicacionesService, private router: Router) { }

  ngOnInit() {
    this.publicaciones.forEach(publicacion => {
      let i: number = 0;
      let enc: boolean = false;

      while (i<publicacion.likes.length && !enc){
        if (publicacion.likes[i] == this.userService.user._id)
          enc = true;

        else
          i++;
      }
      
      if (enc)
        publicacion.myLike = true;

      else
        publicacion.myLike = false;
    })
  }

  darLike(publicacion){
    this.publicacionesService.likePubli(publicacion._id).subscribe((data) =>  {
      if (publicacion.myLike){
        publicacion.myLike = false;
        publicacion.likes.splice(publicacion.likes.indexOf(publicacion), 1);
      }

      else{
        publicacion.myLike = true;
        publicacion.likes.push(this.userService.user._id);
      }
    });
  }

  goComments(publicacion){
    this.router.navigate(['principal/home/' + publicacion._id + "/comentarios"]);
  }
}
