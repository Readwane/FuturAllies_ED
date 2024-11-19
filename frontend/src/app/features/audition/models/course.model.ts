export class Course {
  id(id: any, value: any) {
    throw new Error('Method not implemented.');
  }
  _id: string;
  moduleId: string;
  title: string;
  pictureUrl?: string;
  description: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    _id: string,
    moduleId: string,
    title: string,
    description: string,
    duration: string,
    pictureUrl?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = _id;
    this.moduleId = moduleId;
    this.title = title;
    this.pictureUrl = pictureUrl;
    this.description = description;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
