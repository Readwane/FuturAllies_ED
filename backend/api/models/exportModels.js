// Importations de la partie authentication
import User from "./authentication/user";
import Group from "./authentication/group";
import Profile from "./authentication/profile";
import UserGroup from "./authentication/user-group";
import Doc from "./authentication/doc";
// Importations pour la partie audition
import Domain from "./audition/Domain";
import Path from "./audition/path";
import Module from "./audition/module";
import Course from "./audition/Course";
import Part from "./audition/part";
import Chapter from "./audition/Chapter";
import Content from "./audition/Content";
import ContentText from "./audition/Content-text";
import ContentVideo from "./audition/content-video";
import Quiz from "./audition/quiz";
import Question from "./audition/Question";
import CorrectAnswer from "./audition/correct-answer";
import StudentAnswer from "./audition/student-answer";
import CourseLearned from "./audition/Course-learned";
import CourseReview from "./audition/course-review";
//Importations pour la partie certification
import Certification from "./certification/certification";
import CertificationGiven from "./certification/certification-given";
import CertificationEvaluation from "./certification/certification-evaluation";
// Importation pour la partie interaction

// Importation pour la partie recruitment
import Offer from "./recruitment/Offer";
import OfferApplication from "./recruitment/Offer-application";
import Training from "./training/training";
import TrainingApplication from "./training/training-application";
import Webinar from "./training/webinar";
import WebinarApplication from "./training/webinar-application";

export {
  User, Group, UserGroup, Profile, 
  Doc, Domain, Path, Module, Course, Part, Chapter, Content, ContentText,
  ContentVideo, Quiz, Question, CorrectAnswer, StudentAnswer,CourseLearned, CourseReview,
  Certification, CertificationGiven, CertificationEvaluation,
  Offer, OfferApplication, Training, TrainingApplication, Webinar, WebinarApplication
};
