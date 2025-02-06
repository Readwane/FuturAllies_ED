import { GoogleGenerativeAI } from "@google/generative-ai";

// Vérification de la clé API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("❌ La clé API de Gemini n'est pas définie dans les variables d'environnement.");
}

// Initialisation de l'API Gemini
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Fonction pour générer du contenu avec gestion des erreurs et retries
const generateContentAI = async (prompt, retries = 3, delay = 2000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      
      // Vérification et extraction correcte du texte généré
      if (result?.response?.candidates?.length) {
        return result.response.candidates[0].content.parts[0].text;
      } else {
        console.warn(`⚠️ Réponse inattendue lors de la génération AI (tentative ${attempt})`);
      }

    } catch (error) {
      console.error(`🚨 Erreur AI (tentative ${attempt}):`, error.message);

      if (attempt < retries) {
        console.log(`🔄 Nouvelle tentative dans ${delay / 1000} secondes...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("❌ Toutes les tentatives ont échoué.");
        return null;
      }
    }
  }
};

// Export de la fonction de génération
export { generateContentAI };