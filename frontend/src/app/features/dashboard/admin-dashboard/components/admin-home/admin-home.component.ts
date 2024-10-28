import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit{


  constructor(private adminService: AdminService) {}

  // Visibilité des différentes sections
  isDashboardVisible = true;
  isUsersVisible = false;
  isAuditionVisible = false;
  isTrainingsVisible = false;
  isOffersVisible = false;
  isOrientationsVisible = false;
  isCertificationsVisible = false;
  isReportsVisible = false;

  selectedStat: string | null = null;

  users: any = [];
  auditions: any = [];
  trainings: any = [];
  offers: any = [];
  orientations: any = [];
  certifications: any = [];
  reports: any = [];


  stats = [
    { title: 'Total Utilisateurs', value: 3200 },
    { title: 'Utilisateurs Premium', value: 750 },
    { title: 'Utilisateurs Freemium', value: 2450 },
    { title: 'Formations Disponibles', value: 120 },
    { title: 'Formations en Cours', value: 35 },
    { title: 'Webinaires Actifs', value: 22 },
    { title: 'Webinaires Terminés', value: 68 },
    { title: 'Inscriptions en Attente de Validation', value: 15 },
    { title: 'Sessions en Cours', value: 12 },
    { title: 'Offres de Stage Publiées', value: 30 },
    { title: 'Offres d\'Emploi Publiées', value: 45 },
    { title: 'Candidatures Reçues', value: 200 },
    { title: 'Notifications Envoyées', value: 500 },
    { title: 'Messages Support Non Résolus', value: 8 },
    { title: 'Certificats Émis', value: 150 }
  ];

  ngOnInit(): void {
    this.loadResources();
  }
  

  loadResources() {
    this.users = this.adminService.getUsers();
    this.auditions = this.adminService.getAuditions();
    this.trainings = this.adminService.getTrainings();
    this.offers = this.adminService.getOffers();
    this.orientations = this.adminService.getOrientations();
    this.certifications = this.adminService.getCertifications();
    this.reports = this.adminService.getCertifications();
    // Chargez les autres ressources de la même manière
  }


  // Méthodes pour afficher ou masquer les sections
  showDashboard() {
    this.resetVisibility();
    this.isDashboardVisible = true;
  }

  // Méthode pour afficher la section des utilisateurs et initialiser la liste selon la stat
  showUsers() {
    this.resetVisibility();
    this.isUsersVisible = true;
    this.selectedStat = null;
  }

  showAudition() {
    this.resetVisibility();
    this.isAuditionVisible = true;
  }

  showTrainings() {
    this.resetVisibility();
    this.isTrainingsVisible = true;
  }

  showOffers() {
    this.resetVisibility();
    this.isOffersVisible = true;
  }

  showOrientations() {
    this.resetVisibility();
    this.isOrientationsVisible = true;
  }

  showCertifications() {
    this.resetVisibility();
    this.isCertificationsVisible = true;
  }

  showReports() {
    this.resetVisibility();
    this.isReportsVisible = true;
  }

  resetVisibility() {
    this.isDashboardVisible = false;
    this.isUsersVisible = false;
    this.isAuditionVisible = false;
    this.isTrainingsVisible = false;
    this.isOffersVisible = false;
    this.isOrientationsVisible = false;
    this.isCertificationsVisible = false;
    this.isReportsVisible = false;
  }

  // Méthode appelée lorsqu'on clique sur une carte de statistique
  handleStatClick(stat: { title: string; value: number }) {
    this.selectedStat = stat.title;
    this.showUsers();
  }

  // Méthode pour filtrer les utilisateurs en fonction de la statistique sélectionnée
  getFilteredUsers() {
    if (!this.selectedStat) {
      return this.users;
    }

    switch (this.selectedStat) {
      case 'Utilisateurs Premium':
        return this.users.filter((user: { type: string; }) => user.type === 'Premium');
      case 'Utilisateurs Freemium':
        return this.users.filter((user: { type: string; }) => user.type === 'Freemium');
      default:
        return this.users;
    }
  }

// admin-home.component.ts
editAudition(audition: any) {
  console.log('Editing audition:', audition);
  // Logique pour éditer une audition
}

deleteAudition(audition: any) {
  console.log('Deleting audition:', audition);
  // Logique pour supprimer une audition
}

editTraining(training: any) {
  console.log('Editing training:', training);
  // Logique pour éditer une formation
}

deleteTraining(training: any) {
  console.log('Deleting training:', training);
  // Logique pour supprimer une formation
}

editOffer(offer: any) {
  console.log('Editing offer:', offer);
  // Logique pour éditer une offre
}

deleteOffer(offer: any) {
  console.log('Deleting offer:', offer);
  // Logique pour supprimer une offre
}

  deleteUser($event: any) {
  throw new Error('Method not implemented.');
  }
  editUser($event: any) {
  throw new Error('Method not implemented.');
  }
  deleteReport($event: any) {
  throw new Error('Method not implemented.');
  }
  editReport($event: any) {
  throw new Error('Method not implemented.');
  }
  deleteCertification($event: any) {
  throw new Error('Method not implemented.');
  }
  editCertification: any;
  deleteOrientation($event: any) {
  throw new Error('Method not implemented.');
  }
  editOrientation($event: any) {
  throw new Error('Method not implemented.');
  }
}
