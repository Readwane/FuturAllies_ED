export class Doc {
    _id: string;  // Identifiant unique du document
    userId: string;  // Référence vers l'utilisateur propriétaire du document
    title: string;  // Titre ou nom du document
    type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other';  // Type de document
    fileUrl: string;  // URL du fichier stocké
    uploadedAt: Date;  // Date d'upload du document
  
    constructor(
      _id: string,
      userId: string,
      title: string,
      type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other',
      fileUrl: string,
      uploadedAt: Date = new Date()
    ) {
      this._id = _id;
      this.userId = userId;
      this.title = title;
      this.type = type;
      this.fileUrl = fileUrl;
      this.uploadedAt = uploadedAt;
    }
  }
  