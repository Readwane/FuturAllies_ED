import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent {
  
handleStatClick(_t24: { title: string; value: number; }) {
throw new Error('Method not implemented.');
}
  // Visibilité des différentes sections
  isDashboardVisible = true;
  isUsersVisible = false;
  isAuditionVisible = false;
  isTrainingsVisible = false;
  isOffersVisible = false;
  isOrientationsVisible = false;
  isCertificationsVisible = false;
  isReportsVisible = false;

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

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
  
  // Méthodes pour afficher ou masquer les sections
  showDashboard() {
    this.resetVisibility();
    this.isDashboardVisible = true;
  }

  showUsers() {
    this.resetVisibility();
    this.isUsersVisible = true;
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

  editUser(id: number) {
    console.log('Editing user with ID:', id);
    // Ajoutez ici la logique pour modifier un utilisateur
  }

  deleteUser(id: number) {
    console.log('Deleting user with ID:', id);
    // Ajoutez ici la logique pour supprimer un utilisateur
  }
}
