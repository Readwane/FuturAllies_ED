// layout.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { PublicLayoutModule } from './public-layout/public-layout.module';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { LoggedLayoutModule } from './logged-layout/logged-layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AdminLayoutModule,
    LoggedLayoutModule,
    PublicLayoutModule
  ],
})
export class LayoutModule {}
