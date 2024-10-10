import dotenv from 'dotenv';

dotenv.config();

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@email.com',
  password: process.env.ADMIN_PASSWORD || 'adminpassword',
};

export const authenticate = async (email, password) => {
  console.log('Attempting to authenticate:', email); // Ajouté pour le débogage
  if (email === ADMIN.email && password === ADMIN.password) {
    console.log(email, ' Authentication successful'); // Ajouté pour le débogage
    return ADMIN;
  }
  console.log('Authentication failed'); // Ajouté pour le débogage
  return null;
};
