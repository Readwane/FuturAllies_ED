import {
 Value, User, Group, UserGroup, Profile, 
  Doc, Domain, Path, Module, Course, Part, Chapter, Content, ContentText,
  ContentVideo, Quiz, Question, CorrectAnswer, CourseLearned, CourseReview,
  Certification, CertificationGiven, CertificationEvaluation,
  Offer, OfferApplication, Training, TrainingApplication, Webinar, WebinarApplication
} from '../api/models/exportModels.js';
  
  export const resources = [
    {
      resource: Value, 
      options: {
        parent: { name: 'Service Management', icon: 'Service' },
      },
    },
    {
      resource: User, 
      options: {
        parent: { name: 'User Management', icon: 'User' },
      },
    },
    {
      resource: Profile,
      options: {
        parent: { name: 'User Management', icon: 'User' },
      },
    },
    {
      resource: Group,
      options: {
        parent: { name: 'User Management', icon: 'User' },
      },
    },
    {
      resource: UserGroup,
      options: {
        parent: { name: 'User Management', icon: 'User' },
      },
    },
    {
      resource: Doc,
      options: {
        parent: { name: 'Documents', icon: 'Document' },
      },
    },
    

    // ********************* Ressources pour la partie audition *************************************
    {
      resource: Domain,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Path,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Module,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Course,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: CourseLearned,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: CourseReview,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Part,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Chapter,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Content,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: ContentText,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: ContentVideo,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Quiz,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: Question,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },
    {
      resource: CorrectAnswer,
      options: { parent: { name: 'Audition Management', icon: 'Book' }},
    },

    // ************************* Ressources pour la partie Certification ********************************
    {
      resource: Certification,
      options: { parent: { name: 'Certification Management', icon: 'Certification' }},
    },
    {
      resource: CertificationGiven,
      options: { parent: { name: 'Certification Management', icon: 'Certification' }},
    },
    {
      resource: CertificationEvaluation,
      options: { parent: { name: 'Certification Management', icon: 'Certification' }},
    },

    // ************************* Ressources pour la partie recuitment ********************************
    {
      resource: Offer,
      options: {
        parent: { name: 'Recruitment Management', icon: 'Recruitment' },
      },
    },
    {
      resource: OfferApplication,
      options: { parent: { name: 'Recruitment Management', icon: 'Recruitment' }},
    },

    // ************************* Ressources pour la partie training ********************************
    {
      resource: Training,
      options: { parent: { name: 'Training Management', icon: 'Training' }},
    },
    {
      resource: TrainingApplication,
      options: { parent: { name: 'Training Management', icon: 'Training' }},
    },
   
    

    // Ressources pour la gestion des webinaires
    {
      resource: Webinar,
      options: {
        parent: { name: 'Webinar Management', icon: 'Webinar' },
      },
    },
    {
      resource: WebinarApplication,
      options: {
        parent: { name: 'Webinar Management', icon: 'Webinar' },
      },
    },
  ];
  