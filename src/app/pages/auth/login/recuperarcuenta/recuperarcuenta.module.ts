import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcuentaPageRoutingModule } from './recuperarcuenta-routing.module';

import { RecuperarcuentaPage } from './recuperarcuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ReactiveFormsModule,
    RecuperarcuentaPageRoutingModule
  ],
  declarations: [RecuperarcuentaPage]
})
export class RecuperarcuentaPageModule {}
