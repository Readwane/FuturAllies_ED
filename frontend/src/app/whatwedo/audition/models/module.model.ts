export class Module {
    id: number;
    title: string;
    path_id: string;
    pictureUrl?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      title: string,
      path_id: string,
      pictureUrl?: string,
      description?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.title = title;
      this.path_id = path_id;
      this.pictureUrl = pictureUrl;
      this.description = description;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  