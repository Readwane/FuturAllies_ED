export class Doc {
    _id: string;  // Identifiant unique du document
    userId: string;  // Référence vers l'utilisateur propriétaire du document
    title: string;  // Titre ou nom du document
    type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other';  // Type de document
    gridfs_id: string;  // URL du fichier stocké
    // uploadedAt: string;  // Date d'upload du document
  
    constructor(
      _id: string,
      userId: string,
      title: string,
      type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other',
      gridfs_id: string,
      // uploadedAt: string
    ) {
      this._id = _id;
      this.userId = userId;
      this.title = title;
      this.type = type;
      this.gridfs_id = gridfs_id;
      // this.uploadedAt = uploadedAt;
    }
  }
  