import { UserRole } from "./user-role.enum";
import { Certification } from "src/app/services/audition/models/certification.model";

export class User {

    constructor(
      public id: string,  // Identifiant unique de l'utilisateur
      public firstName: string,  // Prénom de l'utilisateur
      public lastName: string,  // Nom de famille de l'utilisateur
      public email: string,  // Adresse email
      public password: string,  // Mot de passe (probablement hashé)
      public role: UserRole,  // Rôle de l'utilisateur (Apprenant, Instructeur, Administrateur)
      public registrationDate: Date,  // Date d'inscription sur la plateforme
      public lastLoginDate?: Date,  // Dernière date de connexion
      public bio?: string,  // Optionnel : biographie pour les instructeurs ou profils publics
      public profilePictureUrl?: string,  // URL de la photo de profil
      public certifications?: Certification[],  // Liste des certifications obtenues
    ) {}
  }
  