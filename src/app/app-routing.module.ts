import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { DashboardElettrComponent } from './dashboard-elettr.component';
import { DashboardGasComponent } from './dashboard-gas.component';
import { DetailsComponent } from './details.component';
import { PageNotFoundComponent } from './not-found.component';

import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'elettr', component: DashboardElettrComponent, canActivate: [AuthGuardService] },
  { path: 'gas', component: DashboardGasComponent, canActivate: [AuthGuardService] },
  { path: 'detail/:livello', component: DetailsComponent, canActivate: [AuthGuardService] },
  //{ path: 'dashboard', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/elettr', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ /*Providers for guard services*/ ]
})
export class AppRoutingModule {}