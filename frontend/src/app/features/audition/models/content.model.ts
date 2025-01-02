export class Content {
    _id: string;
    sectionId: string;
    type: 'text' | 'video' | 'image';
    content: any;
    contentUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
        _id: string, 
        sectionId: string, 
        type: 'text' | 'video' | 'image',
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.sectionId = sectionId;
      this.type = type;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  