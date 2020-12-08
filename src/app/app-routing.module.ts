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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/menu-tabs/menu-tabs.module').then(m => m.MenuTabsPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/home/perfil/perfil.module').then( m => m.PerfilPageModule)
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [NoauthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
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
  },
  {
    path: 'modperfil',
    loadChildren: () => import('./pages/home/perfil/modperfil/modperfil.module').then( m => m.ModperfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
