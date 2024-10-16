export class Doc {
    id: number;  // Identifiant unique du document
    userId: number;  // Référence vers l'utilisateur propriétaire du document
    title: string;  // Titre ou nom du document
    type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other';  // Type de document
    fileUrl: string;  // URL du fichier stocké
    uploadedAt: Date;  // Date d'upload du document
  
    constructor(
      id: number,
      userId: number,
      title: string,
      type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other',
      fileUrl: string,
      uploadedAt: Date = new Date()
    ) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.type = type;
      this.fileUrl = fileUrl;
      this.uploadedAt = uploadedAt;
    }
  }
  