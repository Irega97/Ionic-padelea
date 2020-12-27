import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTorneoPageRoutingModule } from './menu-torneo-routing.module';

import { MenuTorneoPage } from './menu-torneo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTorneoPageRoutingModule
  ],
  declarations: [MenuTorneoPage]
})
export class MenuTorneoPageModule {}
