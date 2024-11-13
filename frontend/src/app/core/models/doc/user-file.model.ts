import { File } from './file.model';  // Import du modèle File
import { User } from '../user/user.model';

export class UserFile {
    _id: string;
  userId: string;
  fileId: string;
  purpose: 'CV' | 'ProfilePicture' | 'Other';

  constructor(
    _id: string,
    userId: string,
    fileId: string,
    purpose: 'CV' | 'ProfilePicture' | 'Other'
  ) {
    this._id = _id;
    this.userId = userId;
    this.fileId = fileId;
    this.purpose = purpose;
  }
}
