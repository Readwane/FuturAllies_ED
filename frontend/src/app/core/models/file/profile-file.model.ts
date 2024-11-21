import { File } from './file.model';  // Import du modèle File
import { User } from '../user/user.model';

export class UserFile {
    _id: string;
  profileId: string;
  fileId: string;
  purpose: 'CV' | 'PROFILE_IMG' | 'OTHER';

  constructor(
    _id: string,
    profileId: string,
    fileId: string,
    purpose: 'CV' | 'PROFILE_IMG' | 'OTHER'
  ) {
    this._id = _id;
    this.profileId = profileId;
    this.fileId = fileId;
    this.purpose = purpose;
  }
}
