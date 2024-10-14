export class Path {
    id: number;
    domainId: number;
    title: string;
    pictureUrl?: string;
    description: string;
    duration: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      domainId: number,
      title: string,
      description: string,
      duration: string,
      pictureUrl?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.domainId = domainId;
      this.title = title;
      this.pictureUrl = pictureUrl;
      this.description = description;
      this.duration = duration;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  