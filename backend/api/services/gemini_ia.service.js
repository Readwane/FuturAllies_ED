import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const generateContentAI = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Retourne le contenu généré
  } catch (error) {
    console.error('Erreur lors de la génération du contenu AI:', error);
    return null; // Si une erreur se produit, on retourne null
  }
};

// Exemple d'appel dans un contrôleur
const exampleController = async (req, res) => {
  const { prompt } = req.body; // On suppose que le prompt est passé dans le corps de la requête
  const content = await generateContentAI(prompt);

  if (content) {
    res.status(200).json({ success: true, content }); // Retourne le contenu généré si succès
  } else {
    res.status(500).json({ success: false, message: 'Erreur de génération du contenu' });
  }
};

const quizRouter = express.Router();

quizRouter.post('/quizz', exampleController); // Créer une nouvelle offre

export {quizRouter};