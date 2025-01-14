import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileTypeComponent } from './components/user-profile-type/user-profile-type.component';


@NgModule({
  declarations: [
    UserProfileTypeComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
    
  exports:[
    UserProfileTypeComponent,
  ]

})

export class PaymentModule {
 }
