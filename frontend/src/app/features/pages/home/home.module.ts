// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeServicesListComponent } from './components/home-services-list/home-services-list.component';
import { HeaderModule } from 'src/app/core/components/header/header.module';
import { AcceuilComponent } from './components/acceuil/acceuil.component';

@NgModule({
  declarations: [
    AcceuilComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeServicesListComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [
    AcceuilComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeServicesListComponent,
  ],
})
export class HomeModule {}
