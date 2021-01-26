import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { EventsService } from 'src/app/services/events.service';
import { MenuController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: User;
  numNotificaciones: number = 0;
  publicacion = {type: 'username', user: {"username": "Ivan","image":"data:image/jpeg;base64,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"}, mensaje:"Primera publi!", likes: [], comments: [], date: Date.now()};

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private events: EventsService,
    private notificationsService: NotificationsService, private menu: MenuController, private components: ComponentsService) { }

  ngOnInit() {
    if (this.userService.user != undefined){
      this.usuario = this.userService.user;
      this.notificationsService.getMyNotifications(true).subscribe(data =>{
        this.numNotificaciones = data.length;
      });
    }

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
    }) 
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
  /*
  goPartidos(){
    this.menu.close('first');
  }*/

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
}
