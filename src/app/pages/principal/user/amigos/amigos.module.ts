import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmigosPageRoutingModule } from './amigos-routing.module';

import { AmigosPage } from './amigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmigosPageRoutingModule
  ],
  declarations: [AmigosPage]
})
export class AmigosPageModule {}
