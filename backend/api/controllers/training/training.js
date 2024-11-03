import Training from '../../models/training/training.js';

export const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.status(200).json(trainings);
    } catch (error) {
        console.error("Erreur dans getTrainings:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des formations." });
    }
};

// Récupérer toutes les formations de type "webinaire"
export const getWebinars = async (req, res) => {
    try {
        const webinars = await Training.find({ type: 'webinar' });
        res.status(200).json(webinars);
    } catch (error) {
        console.error("Erreur dans getWebinars:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des webinaires." });
    }
};

// Récupérer toutes les formations en présentiel
export const getInPersonTrainings = async (req, res) => {
    try {
        const inPersonTrainings = await Training.find({ type: 'in-person' });
        res.status(200).json(inPersonTrainings);
    } catch (error) {
        console.error("Erreur dans getInPersonTrainings:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des formations en présentiel." });
    }
};

export const createTraining = async (req, res) => {
    try {
        const training = new Training(req.body);

        // Vérification des données avant la sauvegarde
        if (!training.name || !training.type) {
            return res.status(400).json({ message: "Nom et type sont obligatoires." });
        }

        await training.save();
        res.status(201).json(training);
    } catch (error) {
        console.error("Erreur dans createTraining:", error);
        res.status(400).json({ message: "Erreur lors de la création de la formation." });
    }
};

export const getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) {
            return res.status(404).json({ message: 'Formation non trouvée.' });
        }
        res.status(200).json(training);
    } catch (error) {
        console.error("Erreur dans getTrainingById:", error);
        res.status(500).json({ message: "Erreur lors de la récupération de la formation." });
    }
};

export const updateTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!training) {
            return res.status(404).json({ message: 'Formation non trouvée.' });
        }
        res.status(200).json(training);
    } catch (error) {
        console.error("Erreur dans updateTraining:", error);
        res.status(400).json({ message: "Erreur lors de la mise à jour de la formation." });
    }
};

export const deleteTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) {
            return res.status(404).json({ message: 'Formation non trouvée.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Erreur dans deleteTraining:", error);
        res.status(500).json({ message: "Erreur lors de la suppression de la formation." });
    }
};
