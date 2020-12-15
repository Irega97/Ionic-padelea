import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTorneoPageRoutingModule } from './admin-torneo-routing.module';

import { AdminTorneoPage } from './admin-torneo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTorneoPageRoutingModule
  ],
  declarations: [AdminTorneoPage]
})
export class AdminTorneoPageModule {}
