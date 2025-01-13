import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/users`;  // Base URL de l'API des utilisateurs

  constructor(private http: HttpClient) {}

  // Enregistrement d'un utilisateur
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // Récupérer un utilisateur par son ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Récupérer un utilisateur par son nom d'utilisateur
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  // Récupérer le nom d'utilisateur par ID
  getUserNameById(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/username`);
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Supprimer un utilisateur par ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Récupérer les groupes d'un utilisateur
  getUserGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}-groups`);
  }

  // Récupérer un groupe d'utilisateur par son ID
  getUserGroupById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}-groups/${id}`);
  }

  // Récupérer les groupes d'un utilisateur par son ID
  getUserGroupsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}-groups/user/${userId}`);
  }

  // Créer un groupe d'utilisateur
  createUserGroup(userGroup: any): Observable<any> {
    return this.http.post(`${this.apiUrl}-groups`, userGroup);
  }

  // Supprimer un groupe d'utilisateur par ID
  deleteUserGroup(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}-groups/${id}`);
  }

  // Récupérer tous les groupes
  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groups`);
  }

  // Récupérer un groupe par son ID
  getGroupById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groups/${id}`);
  }

  // Créer un groupe
  createGroup(group: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/groups`, group);
  }

  // Mettre à jour un groupe
  updateGroup(id: string, group: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/groups/${id}`, group);
  }
}
