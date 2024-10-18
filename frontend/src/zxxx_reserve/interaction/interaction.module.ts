import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteractionRoutingModule } from './interaction-routing.module';
import { ForumPageComponent } from './components/forum-page/forum-page.component';


@NgModule({
  declarations: [
    ForumPageComponent
  ],
  imports: [
    CommonModule,
    InteractionRoutingModule
  ]
})
export class InteractionModule { }
