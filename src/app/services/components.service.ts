import { Injectable } from '@angular/core';
import { AlertController, LoadingController, SelectValueAccessor, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  private load: Boolean = false;
  private toastload: Boolean = false;
  private alertload: Boolean = false;
  constructor(private loadingController: LoadingController, private alertController: AlertController, private toastController: ToastController) { }

  async presentAlert(mensaje: string){
    if (!this.alertload){
      this.alertload = true;
      const alert = await this.alertController.create({
        message: mensaje,
        buttons: [{
          text: 'OK', 
          handler: () => {
            this.alertload = false;
          }
        }]
      })
      alert.present();
    }
  }

  async presentToast(notification){
    if (!this.toastload){
      this.toastload = true;
      const toast = await this.toastController.create({
        message: notification.description,
        duration: 2000,
        buttons: [
          {
            text: 'CERRAR',
            role: 'cancel',
          }
        ]
      })
      toast.present();
      
      toast.onDidDismiss().then(() => (
        this.toastload = false));
    }
  }

  async presentLoading(mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje
    });
    this.load = true;
    return loading.present();
  }

  dismissLoading(){
    if (this.load){
      this.load = false;
      this.loadingController.dismiss();
    }
  }
}
