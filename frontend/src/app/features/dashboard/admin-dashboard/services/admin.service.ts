import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Doc } from "src/app/core/models/doc.model";
import { Group } from "src/app/core/models/group.model";
import { Profile } from "src/app/core/models/profile.model";
import { UserGroup } from "src/app/core/models/user-group.model";
import { User } from "src/app/core/models/user.model";
import { Chapter } from "src/app/features/audition/models/chapter.model";
import { CourseLearned } from "src/app/features/audition/models/course-learned.model";
import { CourseReview } from "src/app/features/audition/models/course-review.model";
import { Course } from "src/app/features/audition/models/course.model";
import { Domain } from "src/app/features/audition/models/domain.model";
import { Module } from "src/app/features/audition/models/module.model";
import { Part } from "src/app/features/audition/models/part.model";
import { Path } from "src/app/features/audition/models/path.model";
import { CertificationEvaluation } from "src/app/features/certification/models/certification-evaluation.model";
import { CertificationGiven } from "src/app/features/certification/models/certification-given.model";
import { OfferApplication } from "src/app/features/offer/models/offer-application.model";
import { Offer } from "src/app/features/offer/models/offer.model";
import { TrainingApplication } from "src/app/features/training/models/training-application.model";
import { Training } from "src/app/features/training/models/training.model";
import { Value } from "src/app/features/value/models/value.model";


exports: [
    User,
    Group,
    UserGroup,
    Doc,
    Profile,
    
    Domain,
    Chapter,
    Course,
    Module,
    Part,
    Path,
    CourseLearned,
    CourseReview,

    CertificationEvaluation,
    CertificationGiven,

    Offer,
    OfferApplication,

    Training,
    TrainingApplication,

    Value
]

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://api.example.com'; // Remplacez par l'URL de votre API


//   Données en dur

users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', type: 'premium' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', type: 'freemium' },
    { id: 3, name: 'Alice Brown', email: 'alice@example.com', role: 'User', type: 'premium' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', type: 'freemium' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', type: 'premium' },
    { id: 6, name: 'Diana White', email: 'diana@example.com', role: 'User', type: 'freemium' },
    { id: 7, name: 'Eve King', email: 'eve@example.com', role: 'User', type: 'premium' },
    { id: 8, name: 'Frank Lewis', email: 'frank@example.com', role: 'User', type: 'freemium' },
    { id: 9, name: 'Grace Turner', email: 'grace@example.com', role: 'User', type: 'premium' },
    { id: 10, name: 'Henry Harris', email: 'henry@example.com', role: 'User', type: 'freemium' },
    { id: 11, name: 'Ivy Martinez', email: 'ivy@example.com', role: 'User', type: 'premium' },
    { id: 12, name: 'Jack Wilson', email: 'jack@example.com', role: 'User', type: 'freemium' },
    { id: 13, name: 'Kathy Clark', email: 'kathy@example.com', role: 'User', type: 'premium' },
    { id: 14, name: 'Leo Young', email: 'leo@example.com', role: 'User', type: 'freemium' },
    { id: 15, name: 'Mia Adams', email: 'mia@example.com', role: 'User', type: 'premium' },
    { id: 16, name: 'Nina Scott', email: 'nina@example.com', role: 'User', type: 'freemium' },
    { id: 17, name: 'Oscar Green', email: 'oscar@example.com', role: 'User', type: 'premium' },
    { id: 18, name: 'Paula Hill', email: 'paula@example.com', role: 'User', type: 'freemium' },
    { id: 19, name: 'Quinn Baker', email: 'quinn@example.com', role: 'User', type: 'premium' },
    { id: 20, name: 'Rachel Lee', email: 'rachel@example.com', role: 'User', type: 'freemium' },
  ];
  

   // Exemple de données pour les autres sections
   auditions = [
    { id: 1, title: 'Audition 1', status: 'Active' },
    { id: 2, title: 'Audition 2', status: 'Terminée' },
  ];

  trainings = [
    { id: 1, title: 'Formation Java', duration: '10h', status: 'Active' },
    { id: 2, title: 'Formation Angular', duration: '15h', status: 'Terminée' },
  ];

  offers = [
    { id: 1, title: 'Offre de Stage - Développeur', company: 'ABC Corp', type: 'Stage' },
    { id: 2, title: 'Offre d\'emploi - Chef de projet', company: 'XYZ Inc.', type: 'Emploi' },
  ];

  orientations = [
    { id: 1, title: 'Orientation vers le développement Web', status: 'Disponible' },
    { id: 2, title: 'Orientation vers le marketing digital', status: 'Disponible' },
  ];

  certifications = [
    { id: 1, title: 'Certification en Java', issued: 150 },
    { id: 2, title: 'Certification en Marketing', issued: 80 },
  ];

  reports = [
    { id: 1, title: 'Rapport d\'activité - Janvier', date: '2024-01-15' },
    { id: 2, title: 'Rapport d\'activité - Février', date: '2024-02-20' },
  ];

 
  constructor(private http: HttpClient) {}

  // Méthodes pour la gestion des utilisateurs
//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/users`);
//   }

//   getUserById(id: number): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/users/${id}`);
//   }

//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/users`, user);
//   }

//   updateUser(id: number, userData: User): Observable<User> {
//     return this.http.put<User>(`${this.apiUrl}/users/${id}`, userData);
//   }

//   deleteUser(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
//   }

//   // Méthodes pour la gestion des statistiques
//   getDashboardStats(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/dashboard/stats`);
//   }

//   getUserStats(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/dashboard/user-stats`);
//   }

//   getTrainingStats(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/dashboard/training-stats`);
//   }

//   // Méthodes pour la gestion des offres
//   getAllOffers(): Observable<Offer[]> {
//     return this.http.get<Offer[]>(`${this.apiUrl}/offers`);
//   }

//   getOfferById(id: number): Observable<Offer> {
//     return this.http.get<Offer>(`${this.apiUrl}/offers/${id}`);
//   }

//   createOffer(offer: Offer): Observable<Offer> {
//     return this.http.post<Offer>(`${this.apiUrl}/offers`, offer);
//   }

//   updateOffer(id: number, offerData: Offer): Observable<Offer> {
//     return this.http.put<Offer>(`${this.apiUrl}/offers/${id}`, offerData);
//   }

//   deleteOffer(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/offers/${id}`);
//   }

//   // Méthodes pour les notifications et les messages
//   getAllNotifications(): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
//   }

//   getUnreadMessages(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/messages/unread`);
//   }

//   sendNotification(notification: Notification): Observable<Notification> {
//     return this.http.post<Notification>(`${this.apiUrl}/notifications`, notification);
//   }

  // Méthodes pour la gestion des formations et certifications
//   getAllTrainings(): Observable<Training[]> {
//     return this.http.get<Training[]>(`${this.apiUrl}/trainings`);
//   }

//   getTrainingById(id: number): Observable<Training> {
//     return this.http.get<Training>(`${this.apiUrl}/trainings/${id}`);
//   }

//   createTraining(training: Training): Observable<Training> {
//     return this.http.post<Training>(`${this.apiUrl}/trainings`, training);
//   }

//   updateTraining(id: number, trainingData: Training): Observable<Training> {
//     return this.http.put<Training>(`${this.apiUrl}/trainings/${id}`, trainingData);
//   }

//   deleteTraining(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/trainings/${id}`);
//   }

//   getCertificationStats(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/dashboard/certification-stats`);
//   }

  getUsers() {
    return this.users;
  }

  getAuditions() {
    return this.auditions;
  }

  getTrainings(){
    return this.trainings;
  }

  getOffers(){
    return this.offers;
  }

  getOrientations(){
    return this.orientations;
  }

  getCertifications(){
    return this.certifications;
  }

  getReports(){
    return this.reports;
  }

  getResourceByTypeAndId(type: string, id: number) {
    switch (type) {
      case 'users':
        return this.users.find(user => user.id === id);
      case 'auditions':
        return this.auditions.find(audition => audition.id === id);
      // Ajoutez des cas pour chaque type de ressource
      default:
        return null;
    }
  }
 
}
