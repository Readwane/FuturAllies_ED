
// User management
import User from './users/User.js';
import AdminProfile from './users/AdminProfile.js';
import InstructorProfile from './users/InstructorProfile.js';
import LearningPathPermission from './users/Permission.js'; 
import NavigateLog from './users/NavigateLog.js';
import PartnerProfile from './users/PartnerProfile.js';
import ProfileDocuments from './users/ProfileDocuments.js';

// Interaction management
import Notification from './intercations/NavigateLog.js'; 
import Message from './intercations/Message.js';

// Aution management
import Domain from './auditions/Domain.js';
import Course from './auditions/Course.js';
import Lesson from './auditions/Lesson.js';
import LessonContent from './auditions/LessonContent.js';
import ContentVideo from './auditions/ContentVideo.js';
import ContentText from './auditions/ContentText.js';
import Quiz from './auditions/Quizz.js';
import Question from './auditions/Question.js';
import CorrectAnswer from './auditions/CorrectAnswer.js';
import StudendAnswer from './auditions/StudendAnswer.js';
import CourseCertification from './auditions/Quizz.js';
import Question from './auditions/Question.js';
import CorrectAnswer from './auditions/CorrectAnswer.js';
import StudendAnswer from './auditions/StudendAnswer.js';




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
  User, 
  Subscription, Group, Permission, UserGroup,
  UserPermission, GroupPermission, UserSession, UserNavigateLog,
  Notification, Message, Domain, LearningPath, Course,
  CourseChapter, Lesson, LessonContent, Offer, Training,
  TrainerAssignment, TrainingEvaluation, TrainingFeedback,
  Job, OfferApplication, Internship, Webinar, WebinarEnrollment
};
