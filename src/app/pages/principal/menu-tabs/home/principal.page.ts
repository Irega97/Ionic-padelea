import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { EventsService } from 'src/app/services/events.service';
import { MenuController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ComponentsService } from 'src/app/services/components.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  numNotificaciones: number = 0;
  publicationForm: FormGroup;
  pulsado: boolean;
  publicaciones: any;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: EventsService, private publiService: PublicacionesService,
    private notificationsService: NotificationsService, private menu: MenuController, private formBuilder: FormBuilder, private components: ComponentsService) { }

  ngOnInit() {
    if (this.userService.user != undefined){
      this.usuario = this.userService.user;
      this.notificationsService.getMyNotifications(true).subscribe(data =>{
        this.numNotificaciones = data.length;
      });
    }

    this.publiService.getHomePublications().subscribe((data: any) => {
      console.log("chuli i love u: ", data);
      this.publicaciones = data;
    })

    this.publicationForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
        this.notificationsService.getMyNotifications(true).subscribe(data =>{
          this.numNotificaciones = data.length;
        });
      }

      else if (data.topic == "nuevaNotificacion"){
        this.numNotificaciones++;
      }

      else if (data.topic == "deleteNotification"){
        this.numNotificaciones--;
      }

      else if (data.topic == "newPost"){
        this.publiService.getHomePublications().subscribe((data: any) => {
          this.publicaciones = data.publicaciones;
        })
      }
    }) 
  }

  ionViewWillEnter(){
    this.pulsado = false;
    this.publicationForm.reset();
  }

  ionViewWillLeave(){
    this.menu.close('first');
  }

  logout(){
    this.authService.signout().subscribe(() =>{
      this.events.publish({
        "topic":"disconnectUser",
        "user": this.userService.user
      })
      this.userService.user = undefined;
      this.userService.i = 0;
      this.events.disconnectSocket();
      this.menu.close('first');
      this.router.navigate(['/auth/login']);
    })
  }

  goPerfil(){
    this.menu.close('first');
    this.router.navigate(['/user/' + this.userService.user.username]);
  }

  goTorneos(){
    this.menu.close('first');
    this.router.navigate(['/user/' + this.userService.user.username + '/torneos']);
  }

  goPartidos(){
    this.menu.close('first');
  }

  goAmigos(){
    this.menu.close('first');
    this.router.navigate(['/user/' + this.userService.user.username + '/amigos']);
  }

  goInfo(){
    this.menu.close('first');
    this.router.navigate(['/principal/sobrenosotros']);
  }

  goNotificaciones(){
    this.menu.close('first');
    let navigationExtras: NavigationExtras = {
      state: {
        notifications: this.usuario.notifications
      }
    };
    this.router.navigate(['/principal/notificaciones'], navigationExtras);
  }

  newPost(){
    this.pulsado = true;
    if (this.publicationForm.invalid){
      return;
    }
    
    let mensaje = this.publicationForm.value.message;
    console.log("enviaria esto: ", mensaje);
    this.components.presentLoading("Conectando...").then(() => {
      this.publiService.postPublication(mensaje).subscribe((data: any) => {
        this.events.publish({
          "topic":"newPost"
        })
        this.components.dismissLoading();
      }, error => {
        this.components.presentAlert(error.error.message);
      });
    });
  }
}
