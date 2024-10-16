export class Part {
    id: number;
    courseId: number;
    title: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      courseId: number,
      title: string,
      order: number,
      description?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.courseId = courseId;
      this.title = title;
      this.description = description;
      this.order = order;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  