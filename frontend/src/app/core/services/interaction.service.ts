import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private apiUrl = 'http://localhost:3000/fapi';  // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Création d'un mail
  createMail(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mails`, data);
  }

  // Récupérer tous les mails
  getMails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mails`);
  }

  // Récupérer un mail par son ID
  getMailById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mails/${id}`);
  }

  // Mettre à jour un mail
  updateMail(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/mails/${id}`, data);
  }

  // Supprimer un mail
  deleteMail(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mails/${id}`);
  }

  // Création d'un message
  createMessage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, data);
  }

  // Récupérer tous les messages
  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`);
  }

  // Récupérer un message par son ID
  getMessageById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${id}`);
  }

  // Mettre à jour un message
  updateMessage(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/messages/${id}`, data);
  }

  // Supprimer un message
  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/messages/${id}`);
  }

  // Création d'une notification
  createNotification(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications`, data);
  }

  // Récupérer toutes les notifications
  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`);
  }

  // Récupérer une notification par son ID
  getNotificationById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications/${id}`);
  }

  // Mettre à jour une notification
  updateNotification(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${id}`, data);
  }

  // Supprimer une notification
  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notifications/${id}`);
  }
}
