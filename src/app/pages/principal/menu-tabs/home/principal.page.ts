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
      this.notificationsService.getMyNotifications().subscribe(data =>{
        this.usuario.notifications = data.notifications;
        this.numNotificaciones = this.usuario.notifications.length;
      });
    }

    else{
      //this.components.presentLoadingHTML();
      this.userService.getMyUser().subscribe(data => {
        this.userService.user = data;
        this.usuario = data;
        //this.components.dismissLoading();
        this.events.connectSocket(data._id, data.username);
  
        this.notificationsService.getMyNotifications().subscribe(data =>{
          this.usuario.notifications = data.notifications;
          this.numNotificaciones = this.usuario.notifications.length;
        });
      });
    }

    this.events.getObservable().subscribe((data)=> {
      if (data.topic == "updateUser") {
        this.usuario = data.user;
      }

      else if (data.topic == "loginUser"){
        this.userService.getMyUser().subscribe(data => {
          this.usuario = data;
          this.userService.user = this.usuario;
          this.events.connectSocket(data._id, data.username);
          this.events.publish({
            "topic": "updateUser",
            "user": this.usuario
          })
        });

        this.notificationsService.getMyNotifications().subscribe(data =>{
          this.usuario.notifications = data.notifications;
          this.numNotificaciones = this.usuario.notifications.length;
        });
      }

      else if (data.topic == "nuevaNotificacion"){
        this.numNotificaciones++;
        this.usuario.notifications.push(data.notification);
      }

      else if (data.topic == "deleteNotification"){
        this.numNotificaciones--;
        this.usuario.notifications = this.usuario.notifications.filter(notification =>{
          if(notification.type == data.notification.type && notification.origen == data.notification.origen){
            let i = this.usuario.notifications.indexOf(notification);
            this.usuario.notifications.splice(i, 1);
          }
        })
      }
    }) 
  }

  ionViewWillLeave(){
    this.menu.close('first');
  }

  logout(){
    this.authService.signout().subscribe(data =>{
      localStorage.clear();
      this.userService.user == undefined;
      this.events.disconnectSocket();
      this.menu.close('first');
      this.router.navigate(['/auth/login']);
    })
  }

  goPerfil(){
    this.menu.close('first');
    this.router.navigate(['/principal/perfil']);
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
