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
      //PATH PARTIDOS
      {
        path: 'sobrenosotros',
        loadChildren: () => import('./pages/principal/sobrenosotros/sobrenosotros.module').then(m => m.SobrenosotrosPageModule)
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('./pages/principal/menu-tabs/home/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
      }
    ]
  },
  {
    path:'chat',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'user/:name',
        loadChildren: () => import('src/app/pages/principal/chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'grupo/:name',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/principal/chat/chat.module').then(m => m.ChatPageModule)
          },
          {
            path: 'informacion',
            loadChildren: () =>  import('src/app/pages/principal/chat/informacion/informacion.module').then(m => m.InformacionPageModule)
          }
        ]
      },
      {
        path: 'nuevo',
          loadChildren: () =>  import('src/app/pages/principal/chat/new-chat/new-chat.module').then(m => m.NewChatPageModule)
      }
    ]
  },
  {
    path: 'user',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':username',
        loadChildren: () => import('src/app/pages/principal/user/user.module').then(m => m.UserPageModule)
      }
    ]
  },
  {
    path: 'torneo',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':name',
        loadChildren: () => import('./pages/principal/menu-torneo/menu-torneo.module').then(m => m.MenuTorneoPageModule)
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
