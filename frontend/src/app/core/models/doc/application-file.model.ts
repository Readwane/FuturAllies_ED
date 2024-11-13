
export class ApplicationFile {
  _id: string;
  applicationId: string;
  fileId: string;
  type: 'CV' | 'ML' | 'CERTIFICAT' | 'OTHER';
  submittedAt: Date;

  constructor(
    _id: string,
    applicationId: string,
    fileId: string,
    type: 'CV' | 'ML' | 'CERTIFICAT' | 'OTHER',
    submittedAt: Date = new Date()
  ) {
    this._id = _id;
    this.applicationId = applicationId;
    this.fileId = fileId;
    this.type = type;
    this.submittedAt = submittedAt;
  }
}
