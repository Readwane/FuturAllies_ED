
import mongoose from 'mongoose';  
import dotenv from 'dotenv';  
import { GridFSBucket } from 'mongodb';  // Importer GridFSBucket  

dotenv.config();  

let gridFSBucket;  // Déclarer une variable pour GridFSBucket  

const connectDB = async () => {  
    await mongoose.connect(process.env.MONGO_ATLAS_URI)  
    .then(() => {  
        console.log('MongoDB connected successfully');  
        const db = mongoose.connection.db; // Obtenir la connexion de la base de données  
        gridFSBucket = new GridFSBucket(db); // Initialiser GridFSBucket  
    })  
    .catch((err) => {  
        console.error('Connection error', err);  
    });  
};  

// Exporter la fonction connectDB et l'instance GridFSBucket  
export { connectDB, gridFSBucket };