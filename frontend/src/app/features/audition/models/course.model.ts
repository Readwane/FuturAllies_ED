import { Chapter } from "./chapter.model";
import { Part } from "./part.model";

export class Course {
  _id: string;
  domainId: string;
  title: string;
  icon: string;
  description: string;
  isPublished: boolean;
  duration: string;
  parts?: Part[];
  createdAt: Date;
  updatedAt: Date;
  

  constructor(
    _id: string,
    domainId: string,
    title: string,
    icon: string,
    description: string,
    duration: string,
    parts?: Part[],
    isPublished: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = _id;
    this.domainId = domainId;
    this.title = title;
    this.icon = icon;
    this.description = description;
    this.duration = duration;
    this.parts = this.parts;
    this.isPublished = isPublished;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Méthode pour obtenir tous les chapitres d'un cours
  getChapters(parts: Part[], chapters: Chapter[]): Chapter[] {
    return parts
      .filter(part => part.courseId === this._id)
      .flatMap(part => chapters.filter(chapter => chapter.partId === part._id));
  }
}
