import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-u-users',
  templateUrl: './u-users.component.html',
  styleUrls: ['./u-users.component.css']
})
export class UUsersComponent implements OnInit {
  userToEdit: any; // Données de l'utilisateur à modifier
  isLoading: boolean = true; // Indique si les données sont en cours de chargement

  fieldsConfig = [
    { name: 'username', label: 'Nom d\'utilisateur', type: 'text', required: true, readonly: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'first_name', label: 'Prénom', type: 'text', required: true },
    { name: 'last_name', label: 'Nom', type: 'text', required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' }
  ];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID utilisateur
    if (userId) {
      this.loadUser(userId); // Charge les données utilisateur
    } else {
      this.isLoading = false; // Arrête le spinner si aucun ID n'est trouvé
    }
  }

  loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.userToEdit = user;
        this.isLoading = false; // Arrête le spinner une fois les données chargées
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', err);
        this.isLoading = false; // Arrête le spinner même en cas d'erreur
      }
    });
  }

  onSubmit(updatedData: any): void {
    console.log('Données mises à jour :', updatedData);
    // Appel au service pour mettre à jour l'utilisateur
    // this.userService.updateUser(updatedData).subscribe({
    //   next: () => console.log('Utilisateur mis à jour avec succès !'),
    //   error: (err) => console.error('Erreur lors de la mise à jour :', err)
    // });
  }

  onCancel(): void {
    console.log('Modification annulée');
  }
}
