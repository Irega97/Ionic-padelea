import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { PartidosPageRoutingModule } from './partidos-routing.module';
import { PartidosPage } from './partidos.page';
import {ComponentsModule} from '../../../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidosPageRoutingModule,
    ComponentsModule

  ],
  declarations: [PartidosPage]
})
export class PartidosPageModule {}
