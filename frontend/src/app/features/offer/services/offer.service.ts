import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer, OfferApplication } from '../models/offer.models'; // Assurez-vous d'importer vos modèles
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = environment.apiBaseUrl; // URL de base de l'API

  constructor(private http: HttpClient) {}

  // ============================================
  // Gestion des offres
  // ============================================

  /**
   * Récupérer toutes les offres
   */
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers`);
  }

  /**
   * Récupérer une offre par son ID
   */
  getOfferById(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/offers/${offerId}`);
  }

  /**
   * Créer une nouvelle offre
   */
  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/offers`, offer);
  }

  /**
   * Mettre à jour une offre
   */
  updateOffer(offerId: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/offers/${offerId}`, offer);
  }

  /**
   * Supprimer une offre
   */
  deleteOffer(offerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offers/${offerId}`);
  }

  // ============================================
  // Gestion des candidatures
  // ============================================

  /**
   * Récupérer toutes les candidatures
   */
  getOfferApplications(): Observable<OfferApplication[]> {
    return this.http.get<OfferApplication[]>(`${this.apiUrl}/offers/applications`);
  }

  /**
   * Soumettre une candidature pour une offre
   */
  submitApplication(offerId: string, application: OfferApplication): Observable<OfferApplication> {
    return this.http.post<OfferApplication>(`${this.apiUrl}/offers/${offerId}/applications`, application);
  }

  /**
   * Récupérer les candidatures pour une offre spécifique
   */
  getOfferApplicationsByOfferId(offerId: string): Observable<OfferApplication[]> {
    return this.http.get<OfferApplication[]>(`${this.apiUrl}/offers/${offerId}/applications`);
  }

  /**
   * Mettre à jour le statut d'une candidature
   */
  updateOfferApplicationStatus(applicationId: string, status: string): Observable<OfferApplication> {
    return this.http.put<OfferApplication>(`${this.apiUrl}/offers/applications/${applicationId}`, { status });
  }

  // ============================================
  // Filtres
  // ============================================

  /**
   * Filtrer les offres
   */
  filterOffers(filters: any): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/filter`, { params: filters });
  }

  // ============================================
  // Gestion des statuts
  // ============================================

  /**
   * Mettre à jour le statut d'une offre
   */
  updateOfferStatus(offerId: string, status: string): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/offers/${offerId}/status`, { status });
  }

  // ============================================
  // Offres expirées
  // ============================================

  /**
   * Récupérer les offres expirées
   */
  getExpiredOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/expired`);
  }

  // ============================================
  // Notifications
  // ============================================

  /**
   * Envoyer une notification
   */
  sendOfferNotification(notification: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/offers/notifications`, notification);
  }

  // ============================================
  // Utilisateurs
  // ============================================

  /**
   * Récupérer les offres créées par un utilisateur
   */
  getOffersByUser(creatorId: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/creator/${creatorId}`);
  }

  // ============================================
  // Exportation et importation
  // ============================================

  /**
   * Exporter les offres en CSV
   */
  exportOffersToCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/offers/export/csv`, { responseType: 'blob' });
  }

  /**
   * Importer des offres à partir d'un CSV
   */
  importOffersFromCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/offers/import/csv`, formData);
  }
}