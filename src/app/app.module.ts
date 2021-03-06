import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth.service';
import { AuthGuardService } from "./auth-guard.service";
import { DashboardService } from "./dashboard.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { DashboardElettrComponent } from './dashboard-elettr.component';
import { DashboardGasComponent } from './dashboard-gas.component';
import { DetailsComponent } from './details.component';
import { PageNotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardElettrComponent,
    DashboardGasComponent,
    DetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuardService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
