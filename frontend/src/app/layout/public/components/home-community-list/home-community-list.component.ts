// components/home-community-list/home-community-list.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-community-list',
  templateUrl: './home-community-list.component.html',
  styleUrls: ['./home-community-list.component.css']
})
export class HomeCommunityListComponent implements OnInit {
  communityStats = [
    { icon: 'school', label: '+ de 50 domaines de formation' },           // icône pour les domaines de formation
    { icon: 'verified_user', label: '+100 profils de certifications' },  // icône pour les certifications
    { icon: 'menu_book', label: '+1000 cours libres' },                   // icône pour les cours
    { icon: 'group', label: '500+ partenaires' }                          // icône pour les partenaires
  ];

  constructor() {}

  ngOnInit(): void {}
}
