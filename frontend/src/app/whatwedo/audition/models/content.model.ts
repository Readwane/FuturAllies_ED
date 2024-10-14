export class Content {
    id: number;
    chapterId: number;
    type: 'text' | 'video';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
        id: number, 
        chapterId: number, 
        type: 'text' | 'video',
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.chapterId = chapterId;
      this.type = type;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  