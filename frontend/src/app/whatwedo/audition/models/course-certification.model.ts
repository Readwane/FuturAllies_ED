export class CourseCertification {
    id: number;
    name: string;
    courseId: number;
    description: string;
    duration: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      name: string,
      courseId: number,
      description: string,
      duration: number,
      level: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.name = name;
      this.courseId = courseId;
      this.description = description;
      this.duration = duration;
      this.level = level;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  