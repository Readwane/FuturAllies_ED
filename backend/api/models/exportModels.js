// Importation des modèles de la gestion des utilisateurs
import User from './users/User.js';
import Profile from './users/Profile.js'; 
import Subscription from './users/Subscription.js'; 
import Group from './users/Group.js'; 
import Permission from './users/Permission.js'; 
import UserGroup from './users/UserGroup.js'; 
import UserPermission from './users/UserPermission.js'; 
import GroupPermission from './users/GroupPermission.js'; 
import UserSession from './users/UserSession.js'; 
import UserNavigateLog from './users/UserNavigateLog.js'; 
import Notification from './users/Notification.js'; 
import Message from './users/Message.js'; 

// Importation des modèles de la gestion du parcours libre
import Domain from './catalogue/Domain.js';
import LearningPath from './catalogue/LearningPath.js';
import Course from './catalogue/Course.js';
import CourseChapter from './catalogue/CourseChapter.js';
import Lesson from './catalogue/Lesson.js';
import LessonContent from './catalogue/LessonContent.js';

// Importation des modèles de la gestion des offres (formation, stage, emploi)
import Offer from './offres/Offer.js';
import Training from './offres/Training.js';
import TrainerAssignment from './offres/TrainingAssigment.js';
import TrainingEvaluation from './offres/TrainingEvaluation.js';
import TrainingFeedback from './offres/TrainingFeedBack.js';
import Job from './offres/Job.js';
import OfferApplication from './offres/OfferApplication.js';
import Internship from './offres/Internship.js';


import Webinar from './formations/Webinar.js';
import WebinarEnrollment from './formations/WebinarEnrollment.js';

// Exportation des modèles pour utilisation dans d'autres fichiers
export {
  User, Profile, Subscription, Group, Permission, UserGroup,
  UserPermission, GroupPermission, UserSession, UserNavigateLog,
  Notification, Message, Domain, LearningPath, Course,
  CourseChapter, Lesson, LessonContent, Offer, Training,
  TrainerAssignment, TrainingEvaluation, TrainingFeedback,
  Job, OfferApplication, Internship, Webinar, WebinarEnrollment
};
