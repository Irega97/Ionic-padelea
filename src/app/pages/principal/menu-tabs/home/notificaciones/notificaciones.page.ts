import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notification } from 'src/app/models/notification';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notifications: Notification[];

  constructor(private router: Router, private notificationService: NotificationsService, private events: EventsService) { }

  ngOnInit() {
    this.notificationService.getMyNotifications(false).subscribe(data=>{
      this.notifications = data.notifications;
    })

    this.events.getObservable().subscribe(data =>{
      if (data.topic == "nuevaNotificacion"){
        this.notifications.push(data.notification);
      }

      else if (data.topic == "deleteNotification"){
        this.notifications.forEach(notification =>{
          if(notification.type == data.notification.type && notification.origen == data.notification.origen){
            let i;
            if (notification.type == "Cola"){
              if (notification.otros == data.notification.otros)
              i = this.notifications.indexOf(notification);
              this.notifications.splice(i, 1);
            }

            else{
              i = this.notifications.indexOf(notification);
              this.notifications.splice(i, 1);
            }
          }
        })
      }
    })
  }

  goNotification(notification) {
    if (notification.status == 1){
      this.notificationService.delNotifications(notification).subscribe(() => {
        this.events.publish({
          "topic":"deleteNotification",
          "notification": notification
        })
      })
    }
    
    if (notification.type == "Amigos"){
      this.router.navigate(['/user/' + notification.origen]);
    }
    else if (notification.type == "Torneo"){
      this.router.navigate(['/torneo/' + notification.origen]);
    }
    else if (notification.type == "Cola"){
      this.router.navigate(['/torneo/' + notification.otros + "/admin"]);
    }
  }
}
