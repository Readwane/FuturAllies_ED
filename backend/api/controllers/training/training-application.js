import TrainingApplication from '../models/trainingApplicationModel.js';

export const createTrainingApplication = async (req, res) => {
    try {
        const trainingApplication = new TrainingApplication(req.body);
        await trainingApplication.save();
        res.status(201).json(trainingApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTrainingApplications = async (req, res) => {
    try {
        const trainingApplications = await TrainingApplication.find().populate('trainingId').populate('userId');
        res.status(200).json(trainingApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrainingApplicationById = async (req, res) => {
    try {
        const trainingApplication = await TrainingApplication.findById(req.params.id).populate('trainingId').populate('userId');
        if (!trainingApplication) return res.status(404).json({ message: 'Training Application not found' });
        res.status(200).json(trainingApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTrainingApplication = async (req, res) => {
    try {
        const trainingApplication = await TrainingApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trainingApplication) return res.status(404).json({ message: 'Training Application not found' });
        res.status(200).json(trainingApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTrainingApplication = async (req, res) => {
    try {
        const trainingApplication = await TrainingApplication.findByIdAndDelete(req.params.id);
        if (!trainingApplication) return res.status(404).json({ message: 'Training Application not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
