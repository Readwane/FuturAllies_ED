export class Chapter {
    _id: string;
    partId: string;
    title: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      partId: string,
      title: string,
      order: number,
      description?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.partId = partId;
      this.title = title;
      this.description = description;
      this.order = order;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  