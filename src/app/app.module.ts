import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './shared/authconfig.interceptor';


//import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

//import { PickupLocationPageModule } from 'src/app/pages/principal/menu-tabs/torneos/new-torneo/pickup-location/pickup-location.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
//const config: SocketIoConfig = { url: 'http://147.83.7.156:3000', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), /*CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'dyjz5e9a6' } as CloudinaryConfiguration),*/ AppRoutingModule, HttpClientModule, SocialLoginModule, SocketIoModule.forRoot(config), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), /*PickupLocationPageModule*/],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1002649055448-tjs8b5kcq4f2g4hudo41q1adnhbp1s53.apps.googleusercontent.com' //CLIENT ID DE GOOGLE CONSOLE
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID, 
            provider: new FacebookLoginProvider('729094408041741')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
