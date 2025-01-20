// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { FeaturesModule } from './features/features.module';


// Angular Material Modules
import { MaterialModule } from './shared/material.module';
import { DashboardsModule } from './dashboards/dashboards.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MaterialModule,

    CoreModule, 
    DashboardsModule,  
    LayoutModule,
    FeaturesModule,  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
