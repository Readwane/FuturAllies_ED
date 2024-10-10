import { Component, OnInit } from '@angular/core';
import { WebinarService } from '../webinar.service';
import { Webinar } from '../models/webinar.model';

@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.css']
})
export class WebinarListComponent implements OnInit {
  webinars: Webinar[] = [];

  constructor(private webinarService: WebinarService) {}

  ngOnInit(): void {
    this.getWebinars();
    console.log(this.getWebinars());
  }

  getWebinars(): void {
    this.webinarService.getWebinars().subscribe(
      (data: Webinar[]) => {
        this.webinars = data;
      },
      error => {
        console.error('Erreur lors de la récupération des webinaires', error);
      }
    );
  }
}
