// recruitment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';
import { OfferApplication } from '../models/offer-application.model';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  // CRUD for Offers

  // Create an offer
  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/offers`, offer);
  }

  // Get all offers
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers`);
  }

  // Get all job offers
  getJobs(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/jobs`);
  }

  // Get all internship offers
  getInternships(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/offers/internships`);
  }

  // Get offer by ID
  getOfferById(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/offers/${id}`);
  }

  // Update an offer by ID
  updateOffer(id: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/offers/${id}`, offer);
  }

  // Delete an offer by ID
  deleteOffer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offers/${id}`);
  }

  // CRUD for Offer Applications

  // Create an offer application
  createOfferApplication(application: OfferApplication): Observable<OfferApplication> {
    return this.http.post<OfferApplication>(`${this.apiUrl}/applications`, application);
  }

  // Get all applications
  getOfferApplications(): Observable<OfferApplication[]> {
    return this.http.get<OfferApplication[]>(`${this.apiUrl}/applications`);
  }

  // Get job applications
  getJobApplications(): Observable<OfferApplication[]> {
    return this.http.get<OfferApplication[]>(`${this.apiUrl}/applications/jobs`);
  }

  // Get internship applications
  getInternshipApplications(): Observable<OfferApplication[]> {
    return this.http.get<OfferApplication[]>(`${this.apiUrl}/applications/internships`);
  }

  // Get application by ID
  getOfferApplicationById(id: string): Observable<OfferApplication> {
    return this.http.get<OfferApplication>(`${this.apiUrl}/applications/${id}`);
  }

  // Update an application by ID
  updateOfferApplication(id: string, application: OfferApplication): Observable<OfferApplication> {
    return this.http.put<OfferApplication>(`${this.apiUrl}/applications/${id}`, application);
  }

  // Delete an application by ID
  deleteOfferApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/applications/${id}`);
  }
}
