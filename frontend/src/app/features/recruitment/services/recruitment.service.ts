import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferStats } from '../models/offer-stats.model';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';
import { OfferApplication } from '../models/offer-application.model';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private apiUrl = 'http://api.example.com/recruitment';

  constructor(private http: HttpClient) {}

  getStats(): Observable<OfferStats[]> {
    return this.http.get<OfferStats[]>(`${this.apiUrl}/stats`);
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers`);
  }

  getOfferById(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/offers/${offerId}`);
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/offers`, offer);
  }

  updateOffer(offerId: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/offers/${offerId}`, offer);
  }

  deleteOffer(offerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offers/${offerId}`);
  }

  getApplicationsByOfferId(offerId: string): Observable<OfferApplication[]> {
    return this.http.get<OfferApplication[]>(`${this.apiUrl}/offers/${offerId}/applications`);
  }
}

