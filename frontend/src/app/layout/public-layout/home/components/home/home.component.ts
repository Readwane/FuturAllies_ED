// import { AuthService } from './../gestion-utilisateurs/connexion/service-connexion/service-connexion.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-acceuil',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
isFixed: any;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
