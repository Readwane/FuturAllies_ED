import TrainingApplication from '../../models/training/training-application.js';
import Training from '../../models/training/training.js';

export const createTrainingApplication = async (req, res) => {
    try {
        console.log('Creating a new training application:', req.body); // Debugging line
        const trainingApplication = new TrainingApplication(req.body);
        await trainingApplication.save();
        console.log('Training application created successfully:', trainingApplication); // Debugging line
        res.status(201).json(trainingApplication);
    } catch (error) {
        console.error('Error creating training application:', error.message); // Debugging line
        res.status(400).json({ message: error.message });
    }
};

export const getTrainingApplications = async (req, res) => {
    try {
        console.log('Fetching all training applications...'); // Debugging line
        const trainingApplications = await TrainingApplication.find()
            .populate('training_id') // Correction: ensure this field matches the model schema
            .populate('user_id', 'name email'); // Populate with user info
        console.log('Training applications fetched successfully:', trainingApplications); // Debugging line
        res.status(200).json(trainingApplications);
    } catch (error) {
        console.error('Error fetching training applications:', error.message); // Debugging line
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all applications for "webinar" type trainings
export const getWebinarApplications = async (req, res) => {
    try {
        console.log('Fetching webinar applications...'); // Debugging line
        const webinarTrainings = await Training.find({ type: 'webinar' });
        const webinarTrainingIds = webinarTrainings.map(training => training._id);

        const webinarApplications = await TrainingApplication.find({ training_id: { $in: webinarTrainingIds } })
            .populate('user_id', 'name email'); // Populate with user info
        console.log('Webinar applications fetched successfully:', webinarApplications); // Debugging line
        res.status(200).json(webinarApplications);
    } catch (error) {
        console.error('Error fetching webinar applications:', error.message); // Debugging line
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all applications for "in-person" type trainings
export const getInPersonApplications = async (req, res) => {
    try {
        console.log('Fetching in-person applications...'); // Debugging line
        const inPersonTrainings = await Training.find({ type: 'in-person' });
        const inPersonTrainingIds = inPersonTrainings.map(training => training._id);

        const inPersonApplications = await TrainingApplication.find({ training_id: { $in: inPersonTrainingIds } })
            .populate('user_id', 'name email'); // Populate with user info
        console.log('In-person applications fetched successfully:', inPersonApplications); // Debugging line
        res.status(200).json(inPersonApplications);
    } catch (error) {
        console.error('Error fetching in-person applications:', error.message); // Debugging line
        res.status(500).json({ message: error.message });
    }
};

export const getTrainingApplicationById = async (req, res) => {
    try {
        console.log(`Fetching training application by ID: ${req.params.id}`); // Debugging line
        const trainingApplication = await TrainingApplication.findById(req.params.id)
            .populate('training_id') // Populate with training info
            .populate('user_id', 'name email'); // Populate with user info
        if (!trainingApplication) {
            console.warn('Training application not found'); // Debugging line
            return res.status(404).json({ message: 'Training Application not found' });
        }
        console.log('Training application fetched successfully:', trainingApplication); // Debugging line
        res.status(200).json(trainingApplication);
    } catch (error) {
        console.error('Error fetching training application by ID:', error.message); // Debugging line
        res.status(500).json({ message: error.message });
    }
};

export const updateTrainingApplication = async (req, res) => {
    try {
        console.log(`Updating training application ID: ${req.params.id} with data:`, req.body); // Debugging line
        const trainingApplication = await TrainingApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trainingApplication) {
            console.warn('Training application not found'); // Debugging line
            return res.status(404).json({ message: 'Training Application not found' });
        }
        console.log('Training application updated successfully:', trainingApplication); // Debugging line
        res.status(200).json(trainingApplication);
    } catch (error) {
        console.error('Error updating training application:', error.message); // Debugging line
        res.status(400).json({ message: error.message });
    }
};

export const deleteTrainingApplication = async (req, res) => {
    try {
        console.log(`Deleting training application ID: ${req.params.id}`); // Debugging line
        const trainingApplication = await TrainingApplication.findByIdAndDelete(req.params.id);
        if (!trainingApplication) {
            console.warn('Training application not found'); // Debugging line
            return res.status(404).json({ message: 'Training Application not found' });
        }
        console.log('Training application deleted successfully'); // Debugging line
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting training application:', error.message); // Debugging line
        res.status(500).json({ message: error.message });
    }
};
