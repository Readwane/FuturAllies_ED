export class Domain {
    _id: string;
    title: string;
    pictureUrl?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      title: string,
      pictureUrl?: string,
      description?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.title = title;
      this.pictureUrl = pictureUrl;
      this.description = description;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  