export class Part {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      courseId: string,
      title: string,
      order: number,
      description?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.courseId = courseId;
      this.title = title;
      this.description = description;
      this.order = order;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  