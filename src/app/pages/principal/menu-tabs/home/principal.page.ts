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
    this.authService.signout().subscribe(data =>{
      localStorage.clear();
      this.userService.user = undefined;
      this.userService.i = 0;
      this.events.disconnectSocket();
      this.menu.close('first');
      this.authService.reload = true;
      this.router.navigate(['/auth/login']);
    })
  }

  goPerfil(){
    this.menu.close('first');
    this.router.navigate(['/principal/user/' + this.userService.user._id]);
  }

  goTorneos(){
    this.menu.close('first');
    this.router.navigate(['/principal/my-torneos']);
  }

  goPartidos(){
    this.menu.close('first');
  }

  goAmigos(){
    this.menu.close('first');
    this.router.navigate(['/principal/amigos']);
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
