import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeDomainsListComponent } from './components/home-domains-list/home-domains-list.component';
import { HomeCommunitiesListComponent } from './components/home-communities-list/home-communities-list.component';
import { HomeWwdosListComponent } from './components/home-wwdos-list/home-wwdos-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent,
    HomeBannerComponent,
  ],
  exports: [
    HomeComponent,
    HomeBannerComponent
  ]
})
export class HomeModule { }
