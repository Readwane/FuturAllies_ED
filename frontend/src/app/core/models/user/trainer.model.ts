export class Trainer {
    userId: string;            // reference l'id de l'utilisateur correspondant
    trainingId: string;
    expertise: string[];            // Liste des domaines d'expertise du formateur
    experienceYears?: number;       // Années d'expérience dans le domaine de la formation
    certifications?: string[];      // Certifications ou diplômes du formateur
    socialMediaLinks?: {            // Liens vers les réseaux sociaux ou le portfolio
      linkedin?: string;
      twitter?: string;
      personalWebsite?: string;
    };
    rating?: number;                // Note moyenne du formateur (ex. sur 5)
  
    constructor(
        userId: string,
        trainingId: string,
      expertise: string[],
      experienceYears?: number,
      certifications?: string[],
      socialMediaLinks?: {
        linkedin?: string;
        twitter?: string;
        personalWebsite?: string;
      },
      rating?: number,
    ) {
      this.userId = userId;
      this.trainingId = trainingId;
      this.expertise = expertise;
      this.experienceYears = experienceYears;
      this.certifications = certifications;
      this.socialMediaLinks = socialMediaLinks;
      this.rating = rating;
    }
  }
  