import Training from '../../models/training/training.js'
import { getAllTrainers } from './trainer.controller.js';
import { getAllTrainingModules } from './training-module.controller.js';
import { getAllTrainingSessions } from './training-session.controller.js';


export const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.status(200).json(trainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les formations de type "webinaire"
export const getWebinars = async (req, res) => {
    try {
        const webinars = await Training.find({ type: 'webinar' });
        res.status(200).json(webinars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les formations en présentiel
export const getInPersonTrainings = async (req, res) => {
    try {
        const inPersonTrainings = await Training.find({ type: 'in-person' });
        res.status(200).json(inPersonTrainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTraining = async (req, res) => {
    try {
        const training = new Training(req.body);
        await training.save();
        res.status(201).json(training);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });
        res.status(200).json(training);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!training) return res.status(404).json({ message: 'Training not found' });
        res.status(200).json(training);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Récupère tous les trainers de la formation
export const getTrainingTrainersById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });

        const trainers = await getAllTrainers(training.trainer); // Appel à la méthode getAllTrainers
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupère tous les modules de la formation
export const getTrainingModulesById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });

        const modules = await getAllTrainingModules(training.modules); // Appel à la méthode getAllTrainingModules
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupère toutes les sessions des différents modules de la formation
export const getAllTrainingModuleSessions = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });

        const sessions = await getAllTrainingSessions(training.modules); // Appel à la méthode getAllTrainingSessions
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
