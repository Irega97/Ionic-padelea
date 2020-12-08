import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private loadingController: LoadingController, private alertController: AlertController) { }

  async presentAlert(mensaje: string){
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    })
    await alert.present();
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
