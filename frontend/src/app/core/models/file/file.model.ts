export class File {
    _id: string;
    title: string;
    type: string;
    gridfs_id: string;
    fileSize: number;
    uploadedAt: Date;
  
    constructor(
      _id: string,
      title: string,
      type: string,
      gridfs_id: string,
      fileSize: number,
      uploadedAt: Date = new Date()
    ) {
      this._id = _id;
      this.title = title;
      this.type = type;
      this.gridfs_id = gridfs_id;
      this.fileSize = fileSize;
      this.uploadedAt = uploadedAt;
    }
  }
  