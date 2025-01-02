import { Course } from "./course.model";

export class Domain {
    _id: string;
    title: string;
    icon?: string;
    description?: string;
    courses?: Course[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
      _id: string,
      title: string,
      icon?: string,
      description?: string,
      courses?: Course[],
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.title = title;
      this.icon = icon;
      this.description = description;
      this.courses = courses;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  