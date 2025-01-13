// file.model.ts

export class File {
    _id: string;
    title: string;
    type: string;
    gridfs_id: string;
    fileSize: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        title: string,
        type: string,
        gridfs_id: string,
        fileSize: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.title = title;
        this.type = type;
        this.gridfs_id = gridfs_id;
        this.fileSize = fileSize;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

// user-file.model.ts

export class UserFile {
    _id: string;
    userId: string;
    fileId: string;
    purpose: 'CV' | 'ML' | 'ATTESTATION' | 'CERTIFICATION' | 'OTHER';
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        userId: string,
        fileId: string,
        purpose: 'CV' | 'ML' | 'ATTESTATION' | 'CERTIFICATION' | 'OTHER',
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.userId = userId;
        this.fileId = fileId;
        this.purpose = purpose;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

// candidacy-file.model.ts

export class CandidacyFile {
    _id: string;
    candidatId: string;
    fileId: string;
    purposeId?: string;
    purposeType: 'Training' | 'Job' | 'Internship';
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        candidatId: string,
        fileId: string,
        purposeType: 'Training' | 'Job' | 'Internship',
        createdAt: Date,
        updatedAt: Date,
        purposeId?: string
    ) {
        this._id = _id;
        this.candidatId = candidatId;
        this.fileId = fileId;
        this.purposeType = purposeType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (purposeId) this.purposeId = purposeId;
    }
}
