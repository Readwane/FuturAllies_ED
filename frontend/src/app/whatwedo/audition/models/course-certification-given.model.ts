export class CourseCertificationGiven {
    id: number;
    userId: number;
    certificationId: number;
    certificationDate: Date;
    certificateUrl?: string;
    score?: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      userId: number,
      certificationId: number,
      certificationDate: Date = new Date(),
      certificateUrl?: string,
      score?: number,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.userId = userId;
      this.certificationId = certificationId;
      this.certificationDate = certificationDate;
      this.certificateUrl = certificateUrl;
      this.score = score;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  