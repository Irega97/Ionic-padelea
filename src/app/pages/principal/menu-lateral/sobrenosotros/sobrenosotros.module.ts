import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobrenosotrosPageRoutingModule } from './sobrenosotros-routing.module';

import { SobrenosotrosPage } from './sobrenosotros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobrenosotrosPageRoutingModule
  ],
  declarations: [SobrenosotrosPage]
})
export class SobrenosotrosPageModule {}
