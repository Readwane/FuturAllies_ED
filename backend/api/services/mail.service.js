import nodemailer from 'nodemailer';

// Configuration du transporteur (exemple pour Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SERVICE_EMAIL, // Votre adresse e-mail
    pass: process.env.SERVICE_PASSWORD, // Votre mot de passe
  },
});

// Fonction pour envoyer un e-mail
const sendEmail = async (from, to, subject, text) => {
  try {
    const mailOptions = {
      from,  // Expéditeur
      to, // Destinataire
      subject, // Sujet de l'e-mail
      text, // Contenu de l'e-mail
    };

    await transporter.sendMail(mailOptions);
    return true; // E-mail envoyé avec succès
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail (Service mail) :', error);
    return false; // Échec de l'envoi
  }
};

export { sendEmail };