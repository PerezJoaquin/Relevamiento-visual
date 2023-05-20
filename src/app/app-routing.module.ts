import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { CustomsplashComponent } from './componentes/customsplash/customsplash.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { TestComponentRenderer } from '@angular/core/testing';
import { ResultadoComponent } from './componentes/resultado/resultado.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path:"login", component:LoginComponent},
  {path:"csplash", component:CustomsplashComponent},
  {path:"principal", component:PrincipalComponent},
  {path:"listado", component:ListadoComponent},
  {path:"tst", component:TestComponentRenderer},
  {path:"resultados", component:ResultadoComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
