import express from 'express';
import { getAllLearningPaths, getLearningPathById, createLearningPath, updateLearningPath, deleteLearningPath } from '../controllers/catalogue/learningPathController.js';

const router = express.Router();

router.get('/', getAllLearningPaths);
router.get('/:id', getLearningPathById);
router.post('/', createLearningPath);
router.put('/:id', updateLearningPath);
router.delete('/:id', deleteLearningPath);

export default router;
