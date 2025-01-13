import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/fapi';  // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Télécharger un fichier
  uploadFile(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/files`, data);
  }

  // Télécharger plusieurs fichiers
  uploadFiles(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/files`, data);
  }

  // Obtenir tous les fichiers
  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`);
  }

  // Obtenir un fichier par son ID
  getFileById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/files/${id}`);
  }

  // Mettre à jour un fichier
  updateFile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/files/${id}`, data);
  }

  // Supprimer un fichier
  deleteFile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/files/${id}`);
  }

  // Créer un fichier utilisateur
  createUserFile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-files`, data);
  }

  // Obtenir tous les fichiers utilisateur
  getUserFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-files`);
  }

  // Obtenir un fichier utilisateur par son ID
  getUserFileById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-files/${id}`);
  }

  // Mettre à jour un fichier utilisateur
  updateUserFile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user-files/${id}`, data);
  }

  // Supprimer un fichier utilisateur
  deleteUserFile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user-files/${id}`);
  }

  // Créer un fichier de candidature
  createCandidacyFile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/candidacy-files`, data);
  }

  // Obtenir tous les fichiers de candidature
  getAllCandidacyFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidacy-files`);
  }

  // Obtenir un fichier de candidature par son ID
  getCandidacyFileById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidacy-files/${id}`);
  }

  // Mettre à jour un fichier de candidature
  updateCandidacyFile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/candidacy-files/${id}`, data);
  }

  // Supprimer un fichier de candidature
  deleteCandidacyFile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/candidacy-files/${id}`);
  }
}
