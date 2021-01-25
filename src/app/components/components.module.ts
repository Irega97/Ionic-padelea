import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { PuntosCardComponent } from './puntos-card/puntos-card.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [StatisticCardComponent, PuntosCardComponent, PublicacionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [StatisticCardComponent, PuntosCardComponent, PublicacionComponent]
})
export class ComponentsModule { }
