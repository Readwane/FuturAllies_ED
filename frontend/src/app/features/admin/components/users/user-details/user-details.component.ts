import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
 
  user: User | null = null; // Données de l'utilisateur à afficher
  isLoading: boolean = true; // Pour indiquer que les données sont en cours de chargement

  fieldsConfig = [
    { name: 'username', label: 'Nom d’utilisateur', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'first_name', label: 'Prénom', type: 'text' },
    { name: 'last_name', label: 'Nom', type: 'text' },
    { name: 'profile_picture', label: 'Photo de profil', type: 'image' },
    { name: 'created_at', label: 'Créé le', type: 'date' },
  ];

  actions = [
    {
      name: 'edit',
      label: 'Modifier',
      icon: 'edit',
      callback: () => this.editUser(),
    },
    {
      name: 'delete',
      label: 'Supprimer',
      icon: 'delete',
      callback: () => this.deleteUser(),
    },
    {
      name: 'back',
      label: 'Retour',
      icon: 'arrow_back',
      callback: () => this.goBack(),
    },

  ];

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService) {}

    ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id'); // Vérifie l'ID dans l'URL
      if (userId) {
        console.log('ID utilisateur récupéré depuis la route:', userId); // Ajoutez cette ligne pour confirmer l'ID
        this.loadUser(userId);
      } else {
        console.warn('Aucun ID utilisateur trouvé dans la route.');
        this.isLoading = false;
      }
    }
    

    loadUser(id: string): void {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          if (user) {
            console.log('Utilisateur chargé:', user);
            this.user = user;
          } else {
            console.warn('Utilisateur non trouvé pour l’ID:', id);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l’utilisateur:', err.message);
          this.isLoading = false;
        },
      });
    }
    

  editUser(): void {
    console.log('Modifier l’utilisateur:', this.user);
    // Naviguer vers une page d'édition si nécessaire
  }

  deleteUser() {
    throw new Error('Method not implemented.');
  }

  goBack(): void {
    console.log('Retour');
    // Implémenter la logique de retour ou de navigation
  }
}
