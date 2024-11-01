import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI_1)
    .then(() => {
      console.log('MongoDB connected successfully');
      })
    .catch((err) => {
      console.error('Connection error', err);
    });
};

export default connectDB;

