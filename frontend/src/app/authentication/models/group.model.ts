export class Group {
    _id: string;  // Identifiant unique du groupe
    name: ' Free Student' | ' Talent Student' | 'Instructor' | 'Employer' | 'Enterprise';
    description: string;  // Description du groupe
    createdAt: Date;  // Date de création du groupe
  
    constructor(
        _id: string, 
        name: ' Free Student' | ' Talent Student' | 'Instructor' | 'Employer' | 'Enterprise',
        description: string, 
        createdAt: Date = new Date()
    ) 
        {
            this._id = _id;
            this.name = name;
            this.description = description;
            this.createdAt = createdAt;
        }
  }
  