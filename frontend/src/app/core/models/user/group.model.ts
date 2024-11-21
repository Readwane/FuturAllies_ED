export class Group {
    _id: string; // Identifiant unique du groupe
    name: 'STUDENT' | 'TRAINER' | 'ENTERPRISE' | 'MANAGER' | 'ADMINISTRATOR'; // Nom ou type de groupe
    description: string; // Description du groupe
    createdAt: Date; // Date de création du groupe
  
    constructor(
      _id: string,
      name: 'STUDENT' | 'TRAINER' | 'ENTERPRISE' | 'MANAGER' | 'ADMINISTRATOR',
      description: string,
      createdAt: Date = new Date()
    ) {
      this._id = _id;
      this.name = name;
      this.description = description;
      this.createdAt = createdAt;
    }
  }
  