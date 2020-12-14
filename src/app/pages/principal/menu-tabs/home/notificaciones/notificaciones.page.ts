import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notifications: Notification[];

  constructor(private router: Router, private notificationService: NotificationsService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state != undefined){
      this.notifications = this.router.getCurrentNavigation().extras.state.notifications;
    }
    else{
      this.notificationService.getMyNotifications().subscribe(data=>{
        this.notifications = data.notifications;
      })
    }
  }

  goNotification(notification) {
    if (notification.type == "Amigos"){
      this.router.navigate(['/principal/search/user/' + notification.origen]);
    }
  }
}
