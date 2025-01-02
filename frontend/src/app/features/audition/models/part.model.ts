import { Chapter } from "./chapter.model";

export class Part {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    order: number;
    chapters?: Chapter[];
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      courseId: string,
      title: string,
      order: number,
      chapters?: Chapter[],
      description?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.courseId = courseId;
      this.title = title;
      this.description = description;
      this.order = order;
      this.chapters = chapters;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  