import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TopHeaderComponent,
    MainHeaderComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    TopHeaderComponent,
    MainHeaderComponent,
    HeaderComponent,
  ],
})
export class HeaderModule { }
