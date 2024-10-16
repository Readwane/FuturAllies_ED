import TrainingApplication from '../../models/training/training-application.js'
import Training from '../../models/training/training.js'

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

// Récupérer toutes les inscriptions pour les formations de type "webinar"
export const getWebinarApplications = async (req, res) => {
    try {
        // Trouver les formations de type "webinar"
        const webinarTrainings = await Training.find({ type: 'webinar' });
        const webinarTrainingIds = webinarTrainings.map(training => training._id);

        // Trouver les inscriptions associées à ces formations
        const webinarApplications = await TrainingApplication.find({ training_id: { $in: webinarTrainingIds } })
            .populate('user_id', 'name email') // Peupler les informations de l'utilisateur

        res.status(200).json(webinarApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer toutes les inscriptions pour les formations de type "in-person"
export const getInPersonApplications = async (req, res) => {
    try {
        // Trouver les formations de type "in-person"
        const inPersonTrainings = await Training.find({ type: 'in-person' });
        const inPersonTrainingIds = inPersonTrainings.map(training => training._id);

        // Trouver les inscriptions associées à ces formations
        const inPersonApplications = await TrainingApplication.find({ training_id: { $in: inPersonTrainingIds } })
            .populate('user_id', 'name email') // Peupler les informations de l'utilisateur

        res.status(200).json(inPersonApplications);
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
