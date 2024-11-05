import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Modèles (à personnaliser selon vos interfaces ou classes)
import { User } from 'src/app/features/user/models/user.model';
import { Profile } from 'src/app/features/user/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/fapi';  // Base URL de l'API

  constructor(private http: HttpClient) {}

  // Headers (à ajuster si besoin)
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // CRUD pour Utilisateurs

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, this.httpOptions);
  }

  // Récupérer un utilisateur par ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, this.httpOptions);
  }

  // Créer un utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/create`, user, this.httpOptions);
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/update`, user, this.httpOptions);
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/users/${id}/delete`, this.httpOptions);
  }

  // Récupérer un utilisateur par nom d'utilisateur (username)
getUserByUsername(username: string): Observable<User> {
  // Assurez-vous que apiUrl et httpOptions sont correctement définis
  return this.http.get<User>(`${this.apiUrl}/users/rep/${username}`, this.httpOptions).pipe(
    // Ajout d'une gestion des erreurs si nécessaire
    catchError((error) => {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      // Vous pouvez renvoyer un observable d'erreur si besoin
      return throwError(() => new Error('Erreur lors de la récupération de l\'utilisateur'));
    })
  );
}


  // CRUD pour Profils

  // Récupérer tous les profils
  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profiles`, this.httpOptions);
  }

  // Récupérer un profil par ID
  getProfileById(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profiles/${id}`, this.httpOptions);
  }

  // Créer un profil
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.apiUrl}/profiles/create`, profile, this.httpOptions);
  }

  // Mettre à jour un profil
  updateProfile(id: string, profile: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/profiles/${id}/update`, profile, this.httpOptions);
  }

  // Supprimer un profil
  deleteProfile(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/profiles/${id}/delete`, this.httpOptions);
  }

  // Récupérer le profil d’un utilisateur par son ID utilisateur
  getProfileByUserId(user_id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/users/byUser/rip/${user_id}`, this.httpOptions);
  }

}
