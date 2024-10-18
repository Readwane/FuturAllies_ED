// Importations de la partie authentication
import User from "./authentication/user.js";
import Group from "./authentication/group.js";
import Profile from "./authentication/profile.js";
import UserGroup from "./authentication/user-group.js";
import Doc from "./authentication/doc.js";
// Importations pour la partie audition
import Domain from "./audition/domain.js";
import Path from "./audition/path.js";
import Module from "./audition/module.js";
import Course from "./audition/course.js";
import Part from "./audition/part.js";
import Chapter from "./audition/chapter.js";
import Content from "./audition/content.js";
import ContentText from "./audition/content-text.js";
import ContentVideo from "./audition/content-video.js";
import Quiz from "./audition/quiz.js";
import Question from "./audition/question.js";
import CorrectAnswer from "./audition/correct-answer.js";
import StudentAnswer from "./audition/student-answer.js";
import CourseLearned from "./audition/course-learned.js";
import CourseReview from "./audition/course-review.js";
//Importations pour la partie certification
import Certification from "./certification/certification.js";
import CertificationGiven from "./certification/certification-given.js";
import CertificationEvaluation from "./certification/certification-evaluation.js";
// Importation pour la partie interaction

// Importation pour la partie recruitment
import Offer from "./recruitment/offer.js";
import OfferApplication from "./recruitment/offer-application.js";

// Importation pour la partie training
import Training from "./training/training.js";
import TrainingApplication from "./training/training-application.js";
import Webinar from "./training/webinar.js";
import WebinarApplication from "./training/webinar-application.js";

// Importation pour la partie sevices
import Service from "./service/service.js";

export {
  User, Group, UserGroup, Profile, 
  Doc, Domain, Path, Module, Course, Part, Chapter, Content, ContentText,
  ContentVideo, Quiz, Question, CorrectAnswer, StudentAnswer,CourseLearned, CourseReview,
  Certification, CertificationGiven, CertificationEvaluation,
  Offer, OfferApplication, Training, TrainingApplication, Webinar, WebinarApplication,
  Service
};
