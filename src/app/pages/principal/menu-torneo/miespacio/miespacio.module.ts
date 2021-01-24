import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiespacioPageRoutingModule } from './miespacio-routing.module';

import { MiespacioPage } from './miespacio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiespacioPageRoutingModule
  ],
  declarations: [MiespacioPage]
})
export class MiespacioPageModule {}
