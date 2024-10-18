export class Content {
    _id: string;
    chapterId: string;
    type: 'text' | 'video';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
        _id: string, 
        chapterId: string, 
        type: 'text' | 'video',
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.chapterId = chapterId;
      this.type = type;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  