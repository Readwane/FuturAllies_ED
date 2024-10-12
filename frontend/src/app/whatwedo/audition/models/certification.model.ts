export class Certification {
    constructor(
      public id: string,  // Identifiant unique de la certification
      public title: string,  // Titre de la certification
      public courseId: string,  // Cours associé à cette certification
      public issueDate: Date,  // Date de délivrance
      public expirationDate?: Date  // Date d'expiration si applicable
    ) {}
  }
  
  