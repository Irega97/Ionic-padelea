import { Injectable } from '@angular/core';
import { AlertController, LoadingController, SelectValueAccessor, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController) { }

  async presentAlert(mensaje: string){
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    })
    await alert.present();
  }

  async presentToast(notification){
    const toast = await this.toastController.create({
      message: notification.description,
      duration: 4000,
      buttons: [
        {
          text: 'CERRAR',
          role: 'cancel',
        }
      ]
    })
    await toast.present();
  }

  async presentLoading(mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje
    });
    await loading.present();
  }

  dismissLoading(){
    this.loadingController.dismiss();
  }
}
