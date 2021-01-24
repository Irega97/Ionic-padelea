import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { PuntosCardComponent } from './puntos-card/puntos-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [StatisticCardComponent, PuntosCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [StatisticCardComponent, PuntosCardComponent]
})
export class ComponentsModule { }
