
export class ApplicationFile {
  _id: string;
  applicationId: string;
  fileId: string;
  type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other';
  submittedAt: Date;

  constructor(
    _id: string,
    applicationId: string,
    fileId: string,
    type: 'CV' | 'MotivationLetter' | 'Certificate' | 'Other',
    submittedAt: Date = new Date()
  ) {
    this._id = _id;
    this.applicationId = applicationId;
    this.fileId = fileId;
    this.type = type;
    this.submittedAt = submittedAt;
  }
}
