import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { PuntosCardComponent } from './puntos-card/puntos-card.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { IonicModule } from '@ionic/angular';
import { MapaComponent } from './mapa/mapa.component';
import { ComentarioComponent} from './comentario/comentario.component'
 
@NgModule({
  declarations: [StatisticCardComponent, PuntosCardComponent, PublicacionComponent, MapaComponent, ComentarioComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [StatisticCardComponent, PuntosCardComponent, PublicacionComponent, MapaComponent, ComentarioComponent]
})
export class ComponentsModule { }
