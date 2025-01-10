// Les importations
import mongoose from 'mongoose';

// Definition schémas des models
const DomainSchema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: { type: String },
    description: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CourseSchema = new mongoose.Schema({
    domainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
    title: { type: String, required: true },
    icon: { type: String },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: false},
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
});

const PartSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ChapterSchema = new mongoose.Schema({
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const SectionSchema = new mongoose.Schema({
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
  
const ContentSchema = new mongoose.Schema({
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true }, 
    type: { type: String, enum: ['text', 'video', 'image'], required: true },
    content: { type: mongoose.Schema.Types.Mixed },
    contentUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const QuizSchema = new mongoose.Schema({
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    title: { type: String, required: true },
    competencyAssessed: [{ type: String, required: true }],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const QuestionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    questionType: { type: String, enum: ['MCQ', 'UCQ'], required: true },
    options: { type: [String], required: true },
    CorrectOptions: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const CourseLearnedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    progress: { type: Number, default: 0.0, min: 0.0, max: 100.0 }
});


const CourseReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }, 
    reviewDate: { type: Date, default: Date.now } 
});


// Definition des index
CourseSchema.index({ domainId: 1 });
CourseLearnedSchema.index({ courseId: 1, userId: 1 });
CourseReviewSchema.index({ courseId: 1, userId: 1 });


// Definition des models
const Domain = mongoose.models.Domain || mongoose.model('Domain', DomainSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
const Part = mongoose.models.Part || mongoose.model('Part', PartSchema);
const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
const Section = mongoose.models.Section || mongoose.model('Section', SectionSchema);
const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
const CourseLearned = mongoose.models.CourseLearned || mongoose.model('CourseLearned', CourseLearnedSchema);
const CourseReview = mongoose.models.CourseReview || mongoose.model('CourseReview', CourseReviewSchema);


// Exportation des models
export {
    Domain, Course, Part, Chapter, Section, Content, Quiz, Question, CourseLearned, CourseReview
};
