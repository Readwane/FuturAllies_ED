import { Component } from '@angular/core';
import { DomaineService } from '../acceuil-formation/acceuil-formation-services/acceuil-formations-services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cafes-des-allies',
  templateUrl: './Webinnaires.component.html',
  styleUrls: ['./Webinnaires.component.css']
})
export class WebinnairesComponent {


   
 webinaires:any[]=[]

  constructor(private domaineService: DomaineService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadWebinaire();

  }
  
  loadWebinaire(): void {
    this.domaineService.getWebinaire().subscribe(data => {
      this.webinaires = data;
    
    });
  }

   
  
  onSelectWebinaire(idWebinaire: string): void {
    this.router.navigate([`/FormationWebinaire/${idWebinaire}/webinaires`]); 
  }


}
