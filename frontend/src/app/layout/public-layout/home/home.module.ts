// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeServicesListComponent } from './components/home-services-list/home-services-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeServicesListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
