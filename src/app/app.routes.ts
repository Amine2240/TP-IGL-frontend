import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { HistoriqueMedicalePageComponent } from './pages/historique-medicale-page/historique-medicale-page.component';
import { DpiPageComponent } from './pages/dpi-page/dpi-page.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { BilanRadiologiquePageComponent} from "./pages/bilan-radiologique-page/bilan-radiologique-page.component";
import { BilanRadiologiqueVisPageComponent} from "./pages/bilan-radiologique-vis-page/bilan-radiologique-vis-page.component";
import { BilanBiologiquePageComponent} from "./pages/bilan-biologique-page/bilan-biologique-page.component";
import { SoinPageComponent} from "./pages/soin-page/soin-page.component";
import { GraphPageComponent } from './pages/graphe-page/graphe-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'page-dpi', pathMatch: 'full' },
    { path: 'page-dpi', component: DpiPageComponent},
    { path: 'page-historique', component: HistoriqueMedicalePageComponent },
    { path: 'login', component: LoginPageComponent},
    { path: 'bilan-radiologique', component: BilanRadiologiquePageComponent },
    { path: 'bilan-biologique', component: BilanBiologiquePageComponent },
    { path: 'soin-page', component: SoinPageComponent},
    {path: 'graphe',component:GraphPageComponent},
        {path:'bilan-radiologique-vis',component: BilanRadiologiqueVisPageComponent
    }
    
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
