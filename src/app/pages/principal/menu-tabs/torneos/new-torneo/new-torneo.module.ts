import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTorneoPageRoutingModule } from './new-torneo-routing.module';

import { NewTorneoPage } from './new-torneo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTorneoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewTorneoPage]
})
export class NewTorneoPageModule {}
