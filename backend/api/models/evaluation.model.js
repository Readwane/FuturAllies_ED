import mongoose from 'mongoose';  

const recruitmentQuizSchema = new mongoose.Schema({
  offerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Offer', 
    required: true 
  },
  title: { 
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


const Section = mongoose.models.Section || mongoose.model('Section', sectionSchema);
const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);
const Evaluation = mongoose.models.Evaluation || mongoose.model('Evaluation', evaluationSchema);
const RecruitmentQuizQuestion = mongoose.models.RecruitmentQuizQuestion || mongoose.model('RecruitmentQuizQuestion', recruitmentQuizQuestionSchema);
const RecruitmentQuiz = mongoose.models.RecruitmentQuiz || mongoose.model('RecruitmentQuiz', recruitmentQuizSchema);

export {
  Content, Evaluation, RecruitmentQuiz, RecruitmentQuizQuestion, Section
 };