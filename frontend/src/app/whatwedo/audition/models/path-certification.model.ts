export class PathCertification {
    id: number;
    name: string;
    pathId: number;
    description: string;
    duration: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      name: string,
      pathId: number,
      description: string,
      duration: number,
      level: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.name = name;
      this.pathId = pathId;
      this.description = description;
      this.duration = duration;
      this.level = level;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  