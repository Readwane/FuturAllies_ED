import { Component, Input, OnInit } from '@angular/core';  
import { Offer } from '../../models/offer.model';  
import { Router } from '@angular/router';  
import { EnterpriseService } from '../../services/enterprise.service'; // Importer le service Enterprise  
import { Enterprise } from '../../../../core/models/user/enterprise.model'; // Importer le modèle Enterprise  

@Component({  
  selector: 'app-offer',  
  templateUrl: './offer.component.html',  
  styleUrls: ['./offer.component.css']  
})  
export class OfferComponent implements OnInit {  

  @Input() offer!: Offer; // Reçoit les données de l'offre en tant qu'entrée  
  enterprise: Enterprise | null = null; // Stocke les détails de l'entreprise  

  constructor(private router: Router, private enterpriseService: EnterpriseService) {} // Injection du service Enterprise  

  ngOnInit(): void {  
    console.log('Offre reçue dans OfferComponent:', this.offer);  

    // Vérification de la validité de l'offre  
    if (!this.offer || !this.offer._id || !this.offer.enterpriseId) {  
        console.error("L'offre n'a pas été correctement chargée ou l'ID est manquant.");  
        return; // Sortie anticipée si l'offre n'est pas valide  
    }  

    console.log('ID de l\'offre reçu (_id) :', this.offer._id);  
    console.log('ID de l\'entreprise à récupérer :', this.offer.enterpriseId);  
    
    // Souscrire à l'Observable pour obtenir les détails de l'entreprise  
    this.enterpriseService.getEnterpriseById(this.offer.enterpriseId).subscribe({  
        next: (enterprise) => {  
            this.enterprise = enterprise;  
            console.log('Détails de l\'entreprise récupérés:', this.enterprise);  
            console.log('Id de l\'entreprise récupérée:', this.enterprise._id);  
        },  
        error: (err) => {  
            console.error('Erreur lors de la récupération des détails de l\'entreprise:', err);  
        }  
    });  
}  
}
