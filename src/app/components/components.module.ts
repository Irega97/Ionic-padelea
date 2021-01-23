import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatisticCardComponent} from './statistic-card/statistic-card.component';
import {PuntosCardComponent} from './puntos-card/puntos-card.component';



@NgModule({
  declarations: [StatisticCardComponent, PuntosCardComponent],
  imports: [
    CommonModule
  ],
  exports: [StatisticCardComponent, PuntosCardComponent]
})
export class ComponentsModule { }
