import mongoose from 'mongoose';  

// Définition du schéma pour l'offre  
const OfferSchema = new mongoose.Schema({
  profil: { type: String, required: true },
  topic: { type: String, required: true },
  company: { type: String, required: true },  // Correction du nom
  companyLocation: { type: String, required: true },  // Correction du nom
  companyWebsite: { type: String },  // Correction du nom
  description: { type: String, required: true },
  domain: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },
  duration: { type: Number },
  type: { type: String, enum: ['Job', 'Internship', 'Other'], required: true },
  requirements: { type: String },
  responsibilities: { type: String },
  educationLevel: { type: String },
  experienceLevel: { type: String },
  contractType: { type: String, enum: ['CDI', 'CDD'], required: true, default: 'CDD' },
  benefits: { type: String },
  contactEmail: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Pending' },
  isRemoteWorking: { type: Boolean, default: false },  // Correction du nom
  applicationMode: { type: String, enum: ['Online', 'Physical', 'Both'], default: 'Online' },
  isCvDocRequireed: { type: Boolean, default: false },  // Correction du nom
  isMlDocRequireed: { type: Boolean, default: false },  // Correction du nom
  canAddAdditionalDocs: { type: Boolean, default: false },  // Correction du nom
  applicationLink: { type: String },
  additionalInfo: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },  // Correction du nom
  expirationDate: { type: Date },
  hasPreselection: { type: Boolean, default: false },
  preselectionType: { type: String, enum: ['OnApplicationFile', 'OnQuiz'] },
  preselectionQuizMode: { type: String, enum: ['Online', 'Physical'] },
  hasEvaluation: { type: Boolean, default: false },
  evaluationMode: { type: String, enum: ['Online', 'Physical'] },
  hasInterview: { type: Boolean, default: false },
  interviewMode: { type: String, enum: ['ByPhone', 'InVisio', 'Physical'] },
});

const offerApplicationSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'In Review'], default: 'Pending' },
  message: { type: String, default: "Je suis très intéressé(e) par cette offre..." },
  submittedDocumentsIds: { type: [String], required: true },
  applicationDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

const recruitmentQuizSchema = new mongoose.Schema({
  offerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Offer', 
    required: true 
  },
  topic: { 
    type: String, 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  totalQuestions: { 
    type: Number, 
    required: true 
  },
  totalPoints: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const recruitmentQuizQuestionSchema = new mongoose.Schema({
  recruitmentQuizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'RecruitmentQuiz', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  order: { 
    type: Number, 
    required: true 
  },
  questionType: { 
    type: String, 
    enum: ['MCQ', 'UCQ'], 
    required: true 
  },
  options: { 
    type: [String], 
    required: true 
  },
  correctOptions: { 
    type: [String], 
    required: true 
  },
  points: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const evaluationSchema = new mongoose.Schema({
  offerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Offer', 
    required: true 
  },
  topic: { 
    type: String, 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['junior', 'intermediate', 'senior'], 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  totalSections: { 
    type: Number, 
    required: true 
  },
  totalPoints: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const contentSchema = new mongoose.Schema({
  sectionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Section', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['coding', 'qcm', 'cas_pratique', 'debugging', 'architecture', 'essai'], 
    required: true 
  },
  content: { 
    type: [String], 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const sectionSchema = new mongoose.Schema({
  evaluationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Evaluation', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  order: { 
    type: Number, 
    required: true 
  },
  points: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});


const OfferApplication = mongoose.models.OfferApplication || mongoose.model('OfferApplication', offerApplicationSchema);
const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
const Section = mongoose.models.Section || mongoose.model('Section', sectionSchema);
const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
const Evaluation = mongoose.models.Evaluation || mongoose.model('Evaluation', evaluationSchema);
const RecruitmentQuizQuestion = mongoose.models.RecruitmentQuizQuestion || mongoose.model('RecruitmentQuizQuestion', recruitmentQuizQuestionSchema);
const RecruitmentQuiz = mongoose.models.RecruitmentQuiz || mongoose.model('RecruitmentQuiz', recruitmentQuizSchema);

export { Offer, OfferApplication,
  Content, Evaluation, RecruitmentQuiz, RecruitmentQuizQuestion, Section
 };