import Enterprise from "../../models/recruitment/enterprise.model.js";
import mongoose from "mongoose";

export const createEnterprise = async (req, res) => {  
    try {  
        console.log('Received data for creating enterprise:', req.body); // Debug: données reçues  
        const enterprise = new Enterprise(req.body);  
        await enterprise.save();  
        console.log('Enterprise created successfully:', enterprise); // Debug: entreprise créée  
        res.status(201).json(enterprise);  
    } catch (error) {  
        console.error('Error creating enterprise:', error); // Debug: erreur de création  
        res.status(400).json({ message: error.message });  
    }  
};  

// Récupérer toutes les entreprises  
export const getEnterprises = async (req, res) => {  
    try {  
        const enterprises = await Enterprise.find();  
        res.status(200).json(enterprises);  
    } catch (error) {  
        console.error('Error fetching enterprises:', error); // Debug: erreur de récupération  
        res.status(500).json({ message: error.message });  
    }  
};  

export const getEnterpriseById = async (req, res) => {  
    try {  
        const enterpriseId = req.params.id;  
        
        // Vérification du format de l'ID  
        if (!mongoose.Types.ObjectId.isValid(enterpriseId)) {  
            console.warn('Invalid ID format:', enterpriseId);  
            return res.status(400).json({ message: 'Invalid ID format' });  
        }  

        console.log('Looking for enterprise with ID:', enterpriseId); // Debug: ID recherché  
        const enterprise = await Enterprise.findById(enterpriseId);  
        
        if (!enterprise) {  
            console.warn('Enterprise not found for ID:', enterpriseId); // Debug: entreprise non trouvée  
            return res.status(404).json({ message: 'Enterprise not found' });  
        }  
        
        res.status(200).json(enterprise);  
    } catch (error) {  
        console.error('Error fetching enterprise by ID:', error); // Debug: erreur de recherche  
        res.status(500).json({ message: error.message });  
    }  
};

// Mettre à jour une entreprise  
export const updateEnterprise = async (req, res) => {  
    try {  
        const enterprise = await Enterprise.findByIdAndUpdate(req.params.id, req.body, { new: true });  
        if (!enterprise) return res.status(404).json({ message: 'Enterprise not found' });  
        res.status(200).json(enterprise);  
    } catch (error) {  
        console.error('Error updating enterprise:', error); // Debug: erreur de mise à jour  
        res.status(400).json({ message: error.message });  
    }  
};  

// Supprimer une entreprise  
export const deleteEnterprise = async (req, res) => {  
    try {  
        const enterprise = await Enterprise.findByIdAndDelete(req.params.id);  
        if (!enterprise) return res.status(404).json({ message: 'Enterprise not found' });  
        res.status(204).send();  
    } catch (error) {  
        console.error('Error deleting enterprise:', error); // Debug: erreur de suppression  
        res.status(500).json({ message: error.message });  
    }  
};