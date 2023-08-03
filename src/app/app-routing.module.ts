import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'authentification',
    pathMatch: 'full'
  },
  {
    path: 'second-page',
    loadChildren: () => import('./pages/second-page/second-page.module').then( m => m.SecondPagePageModule)
  },
  {
    path: 'second-page/:id',
    loadChildren: () => import('./pages/second-page/second-page.module').then( m => m.SecondPagePageModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./pages/authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
