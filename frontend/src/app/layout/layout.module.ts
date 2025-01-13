import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './public/components/home/home.component';
import { HomeBannerComponent } from './public/components/home-banner/home-banner.component';
import { HomeValuesListComponent } from './public/components/home-values-list/home-values-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { AcceuilComponent } from './public/components/acceuil/acceuil.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { HomeDomainsListComponent } from './public/components/home-domains-list/home-domains-list.component';
import { AuditionModule } from '../features/audition/audition.module';
import { HomeCommunityListComponent } from './public/components/home-community-list/home-community-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcceuilComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeValuesListComponent,
    HomeDomainsListComponent,
    HomeCommunityListComponent,
    
  ],
  imports: [
    CommonModule,
    CoreModule,
    AuditionModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AcceuilComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeValuesListComponent,
    HomeDomainsListComponent,
    HomeCommunityListComponent
  ],
})
export class LayoutModule {}
