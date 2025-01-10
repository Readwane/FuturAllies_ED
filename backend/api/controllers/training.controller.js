import {Training, TrainingApplication, TrainingModule, TrainingSession} from '../models/training.model.js';



// ---------------------------------- MODEL TRAINING CONTROLLERS ----------------------------------
const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.status(200).json(trainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getWebinars = async (req, res) => {
    try {
        const webinars = await Training.find({ type: 'webinar' });
        res.status(200).json(webinars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInPersonTrainings = async (req, res) => {
    try {
        const inPersonTrainings = await Training.find({ type: 'in-person' });
        res.status(200).json(inPersonTrainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTrainingById = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });
        res.status(200).json(training);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!training) return res.status(404).json({ message: 'Training not found' });
        res.status(200).json(training);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteTraining = async (req, res) => {
    try {
        const training = await Training.findByIdAndDelete(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ---------------------------------- MODEL TRAINING-MODULE CONTROLLERS ----------------------------------

const getTrainingModules = async (req, res) => {
  try {
    const trainingModules = await TrainingModule.find();
    res.status(200).json(trainingModules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTrainingModuleById = async (req, res) => {
  try {
    const trainingModule = await TrainingModule.findById(req.params.id);
    if (!trainingModule) return res.status(404).json({ message: 'Module de formation non trouvé' });
    res.status(200).json(trainingModule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTrainingModule = async (req, res) => {
  const { trainingId, title, description, duration, order, objectives, content, resources, assessment, prerequisites } = req.body;

  const trainingModule = new TrainingModule({
    trainingId,
    title,
    description,
    duration,
    order,
    objectives,
    content,
    resources,
    assessment,
    prerequisites,
  });

  try {
    await trainingModule.save();
    res.status(201).json(trainingModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateTrainingModule = async (req, res) => {
  try {
    const trainingModule = await TrainingModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainingModule) return res.status(404).json({ message: 'Module de formation non trouvé' });
    res.status(200).json(trainingModule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteTrainingModule = async (req, res) => {
  try {
    const trainingModule = await TrainingModule.findByIdAndDelete(req.params.id);
    if (!trainingModule) return res.status(404).json({ message: 'Module de formation non trouvé' });
    res.status(200).json({ message: 'Module de formation supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------- MODEL TRAINING-SESSION CONTROLLERS ----------------------------------

const getTrainingSessions = async (req, res) => {
  try {
    const trainingSessions = await TrainingSession.find();
    res.status(200).json(trainingSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTrainingSessionById = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findById(req.params.id);
    if (!trainingSession) return res.status(404).json({ message: 'Séance de formation non trouvée' });
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTrainingSession = async (req, res) => {
  const { trainingModuleId, title, description, duration, sessionDate, order } = req.body;
  const trainingSession = new TrainingSession({
    trainingModuleId,
    title,
    description,
    duration,
    sessionDate,
    order,
  });

  try {
    await trainingSession.save();
    res.status(201).json(trainingSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateTrainingSession = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trainingSession) return res.status(404).json({ message: 'Séance de formation non trouvée' });
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteTrainingSession = async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findByIdAndDelete(req.params.id);
    if (!trainingSession) return res.status(404).json({ message: 'Séance de formation non trouvée' });
    res.status(200).json({ message: 'Séance de formation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------- MODEL TRAING-APPLICATION CONTROLLERS --------------------------------

const getTrainingApplications = async (req, res) => {
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

const createTrainingApplication = async (req, res) => {
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


const getWebinarApplications = async (req, res) => {
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


const getInPersonApplications = async (req, res) => {
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

const getTrainingApplicationById = async (req, res) => {
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

const updateTrainingApplication = async (req, res) => {
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

const deleteTrainingApplication = async (req, res) => {
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

// Export all controllers
export {
    getTrainings,
    getWebinars,
    getInPersonTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining,
    getTrainingModules,
    getTrainingModuleById,
    createTrainingModule,
    updateTrainingModule,
    deleteTrainingModule,
    getTrainingSessions,
    getTrainingSessionById,
    createTrainingSession,
    updateTrainingSession,
    deleteTrainingSession,
    getTrainingApplications,
    createTrainingApplication,
    getWebinarApplications,
    getInPersonApplications,
    getTrainingApplicationById,
    updateTrainingApplication,
    deleteTrainingApplication
};