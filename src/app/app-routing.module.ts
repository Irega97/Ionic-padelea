import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { NoauthGuard } from './shared/noauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/principal/menu-tabs/menu-tabs.module').then(m => m.MenuTabsPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/principal/menu-lateral/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'my-torneos',
        loadChildren: () => import('./pages/principal/menu-lateral/torneos/torneos.module').then( m => m.TorneosPageModule)
      },
      //PATH PARTIDOS
      {
        path: 'amigos',
        loadChildren: () => import('./pages/principal/menu-lateral/amigos/amigos.module').then( m => m.AmigosPageModule)
      },
      {
        path: 'sobrenosotros',
        loadChildren: () => import('./pages/principal/menu-lateral/sobrenosotros/sobrenosotros.module').then(m => m.SobrenosotrosPageModule)
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('./pages/principal/menu-tabs/home/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
      }
    ]
  },
  {
    path: 'auth',
    canActivateChild: [NoauthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        children:[
          {
            path: '',
            loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
          },
          {
            path: 'recuperarcuenta',
            loadChildren: () => import('./pages/auth/login/recuperarcuenta/recuperarcuenta.module').then( m => m.RecuperarcuentaPageModule)
          }
        ]
        
      },
      {
        path: 'registro',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/auth/registro/registro.module').then( m => m.RegistroPageModule)
          },
          {
            path: 'setusername',
            loadChildren: () => import('./pages/auth/registro/setusername/setusername.module').then( m => m.SetusernamePageModule)
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
