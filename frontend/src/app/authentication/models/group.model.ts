export class Group {
    id: number;  // Identifiant unique du groupe
    name: 'Student' | 'Instructor' | 'Employer' | 'Enterprise';
    description: string;  // Description du groupe
    createdAt: Date;  // Date de création du groupe
  
    constructor(
        id: number, 
        name: 'Student' | 'Instructor' | 'Employer' | 'Enterprise',
        description: string, 
        createdAt: Date = new Date()
    ) 
        {
            this.id = id;
            this.name = name;
            this.description = description;
            this.createdAt = createdAt;
        }
  }
  