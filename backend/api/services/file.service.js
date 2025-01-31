import { gridFSBucket } from '../db/config.db.js';

const uploadToGridFS = async (file) => {
  const uploadStream = gridFSBucket.openUploadStream(file.originalname);
  return new Promise((resolve, reject) => {
    uploadStream.on('error', reject);
    uploadStream.on('finish', () => resolve(uploadStream.id));
    uploadStream.end(file.buffer);
  });
};

export {uploadToGridFS};