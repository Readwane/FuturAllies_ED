import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BountonComponent } from './components/bounton/bounton.component';
import { SimpleLinkComponent } from './components/simple-link/simple-link.component';
import { DropdownLinkComponent } from './components/dropdown-link/dropdown-link.component';
import { LoginLinkComponent } from './components/login-link/login-link.component';


@NgModule({
  declarations: [
    BountonComponent,
    SimpleLinkComponent,
    DropdownLinkComponent,
    LoginLinkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    BountonComponent,
    DropdownLinkComponent,
    LoginLinkComponent,
    SimpleLinkComponent
  ]
})
export class SharedModule { }
