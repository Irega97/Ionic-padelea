import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdperfilPageRoutingModule } from './updperfil-routing.module';

import { UpdperfilPage } from './updperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdperfilPageRoutingModule
  ],
  declarations: [UpdperfilPage]
})
export class UpdperfilPageModule {}
