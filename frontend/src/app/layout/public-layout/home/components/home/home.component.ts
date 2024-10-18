// import { AuthService } from './../gestion-utilisateurs/connexion/service-connexion/service-connexion.service';
import { Component, OnInit } from '@angular/core';
import { HomeBannerComponent } from '../home-banner/home-banner.component';
import { HomeServicesListComponent } from '../home-services-list/home-services-list.component';


@Component({
  // standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  imports: [
    HomeBannerComponent,
    HomeServicesListComponent,
    
  ]

})

export class HomeComponent{

  ngOnInit(): void {
   
  }
}
