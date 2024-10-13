// import { AuthService } from './../gestion-utilisateurs/connexion/service-connexion/service-connexion.service';
import { Component, OnInit } from '@angular/core';
import { HomeBannerComponent } from '../home-banner/home-banner.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HomeBannerComponent]
})
export class HomeComponent implements OnInit{
isFixed: any;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
