export class CourseTacked {
    id: number;
    userId: number;
    courseId: number;
    startedAt: Date;
    completedAt?: Date;
    progress: number;
  
    constructor(
      id: number,
      userId: number,
      courseId: number,
      startedAt: Date = new Date(),
      completedAt?: Date,
      progress: number = 0.0
    ) {
      this.id = id;
      this.userId = userId;
      this.courseId = courseId;
      this.startedAt = startedAt;
      this.completedAt = completedAt;
      this.progress = progress;
    }
  }
  