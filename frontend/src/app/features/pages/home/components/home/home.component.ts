// import { AuthService } from './../gestion-utilisateurs/connexion/service-connexion/service-connexion.service';
import { Component, OnInit } from '@angular/core';
import { HomeBannerComponent } from '../home-banner/home-banner.component';
import { HomeServicesListComponent } from '../home-services-list/home-services-list.component';
import { HeaderComponent } from 'src/app/core/components/header/components/header/header.component';


@Component({
  // standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent{
  ngOnInit(): void {
   
  }
}
