export class Permission {
    _id: string; // Identifiant unique de la permission
    name: string; // Nom de la permission (exemple : 'READ_USER', 'WRITE_USER')
    description: string; // Description de la permission
    createdAt: Date; // Date de création de la permission
  
    constructor(
      _id: string,
      name: string,
      description: string,
      createdAt: Date = new Date()
    ) {
      this._id = _id;
      this.name = name;
      this.description = description;
      this.createdAt = createdAt;
    }
  }
  