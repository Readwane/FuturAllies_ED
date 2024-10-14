export class LearningPath {
  id: number;
  moduleId: number;
  title: string;
  pictureUrl?: string;
  description: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    moduleId: number,
    title: string,
    description: string,
    duration: string,
    pictureUrl?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.moduleId = moduleId;
    this.title = title;
    this.pictureUrl = pictureUrl;
    this.description = description;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
