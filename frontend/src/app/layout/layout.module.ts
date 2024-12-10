import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './public/components/home/home.component';
import { HomeBannerComponent } from './public/components/home-banner/home-banner.component';
import { HomeValuesListComponent } from './public/components/home-values-list/home-values-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { AcceuilComponent } from './public/components/acceuil/acceuil.component';
import { ValueModule } from '../features/value/value.module';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    AcceuilComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeValuesListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ValueModule,
    MaterialModule
  ],
  exports: [
    AcceuilComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeValuesListComponent,
  ],
})
export class LayoutModule {}
