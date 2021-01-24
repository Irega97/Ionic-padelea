import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VueltasPageRoutingModule } from './vueltas-routing.module';
import {ComponentsModule} from '../../../../components/components.module';
import { VueltasPage } from './vueltas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VueltasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [VueltasPage]
})
export class VueltasPageModule {}
