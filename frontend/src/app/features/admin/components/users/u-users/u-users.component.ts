import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-u-users',
  templateUrl: './u-users.component.html',
  styleUrls: ['./u-users.component.css']
})
export class UUsersComponent implements OnInit, OnDestroy {
  userToEdit: any = null; // Données de l'utilisateur à modifier
  isLoading: boolean = true; // Indique si les données sont en cours de chargement
  errorMessage: string | null = null; // Pour afficher un message d'erreur éventuel

  fieldsConfig = [
    { name: 'username', label: 'Nom d\'utilisateur', type: 'text', required: true, readonly: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'first_name', label: 'Prénom', type: 'text', required: true },
    { name: 'last_name', label: 'Nom', type: 'text', required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' }
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID utilisateur
    if (userId) {
      this.loadUser(userId); // Charge les données utilisateur
    } else {
      this.isLoading = false;
      this.showToast('ID utilisateur manquant', 'error');
    }
  }

  ngOnDestroy(): void {
    // Nettoyages éventuels si nécessaire
  }

  /**
   * Charge les données de l'utilisateur par ID
   */
  loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.userToEdit = user;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les données utilisateur.';
        this.isLoading = false;
        this.showToast('Erreur lors du chargement de l\'utilisateur.', 'error');
        console.error(err);
      }
    });
  }

  /**
   * Gère la soumission du formulaire de mise à jour
   */
  onSubmit(updatedData: any): void {
    if (!this.userToEdit || !updatedData) {
      this.showToast('Données utilisateur invalides.', 'error');
      return;
    }

    this.isLoading = true;

    this.userService.updateUser(this.userToEdit.id, updatedData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showToast('Utilisateur mis à jour avec succès.', 'success');
        this.router.navigate(['/users']); // Redirection après succès
      },
      error: (err) => {
        this.isLoading = false;
        this.showToast('Erreur lors de la mise à jour de l\'utilisateur.', 'error');
        console.error(err);
      }
    });
  }

  /**
   * Gère l'annulation de la modification
   */
  onCancel(): void {
    this.router.navigate(['/users']); // Redirection vers la liste des utilisateurs
    this.showToast('Modification annulée.', 'info');
  }

  /**
   * Affiche une notification
   */
  private showToast(message: string, type: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: `toast-${type}`
    });
  }
}
