import { Domain, Course, Part, Chapter, Section, Content, Quiz, Question, CourseLearned, CourseReview } from '../models/audition.model.js';

//*************************** MODEL Domain CRUD ******************************************************* */
// CREATE Domain
const createDomain = async (req, res) => {
    try {
        const domain = new Domain(req.body);
        await domain.save();
        res.status(201).json(domain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Domains
const getDomains = async (req, res) => {
    try {
        const domains = await Domain.find().populate('courses');
        res.status(200).json(domains);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Domain by Id
const getDomainById = async (req, res) => {
    try {
      const domain = await Domain.findById(req.params.id);
      if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });
      res.status(200).json(domain);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// UPDATE domain
const updateDomain = async (req, res) => {
    const { title, icon, description } = req.body;
  
    try {
      const domain = await Domain.findByIdAndUpdate(req.params.id, {
        title,
        icon,
        description,
        updatedAt: Date.now()
      }, { new: true });
  
      if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });
      res.status(200).json(domain);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// DELETE domain
const deleteDomain = async (req, res) => {
    try {
      const domain = await Domain.findByIdAndDelete(req.params.id);
      if (!domain) return res.status(404).json({ message: 'Domaine non trouvé' });
      res.status(200).json({ message: 'Domaine supprimé' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


//*************************** MODEL Course CRUD ******************************************************* */

// CREATE Course
const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Courses (populate domain and parts)
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('domainId parts');
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Course (populate domain and parts)
const getCourseById = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate('dmainId parts');
      if (!course) return res.status(404).json({ message: 'Cours non trouvé' });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// UPDATE Course
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true }).populate('domainId parts');
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Course
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//*************************** MODEL Part CRUD ******************************************************* */

// CREATE Part
const createPart = async (req, res) => {
    try {
        const part = new Part(req.body);
        await part.save();
        res.status(201).json(part);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Part (populate chapters)
const getParts = async (req, res) => {
    try {
        const parts = await Part.find().populate('chapters');
        res.status(200).json(parts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Part by ID (avec population des chapitres associés)
const getPartById = async (req, res) => {
    try {
        const { id } = req.params;
        const part = await Part.findById(id).populate('chapters');
        if (!part) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.status(200).json(part);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Part
const deletePart = async (req, res) => {
    try {
        const { id } = req.params;
        const part = await Part.findByIdAndDelete(id);
        if (!part) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Part
const updatePart = async (req, res) => {
    try {
        const { id } = req.params;
        const part = await Part.findByIdAndUpdate(id, req.body, { new: true }).populate('chapters');
        if (!part) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.status(200).json(part);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



//*************************** MODEL Chapter CRUD ******************************************************* */

// CREATE Chapter
const createChapter = async (req, res) => {
    try {
        const chapter = new Chapter(req.body);
        await chapter.save();
        res.status(201).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Chapter (populate sections)
const getChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find().populate('sections');
        res.status(200).json(chapters);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Chapter by ID (avec population des sections associées)
const getChapterById = async (req, res) => {
    try {
        const { id } = req.params;
        const chapter = await Chapter.findById(id).populate('sections');
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Chapter
const updateChapter = async (req, res) => {
    try {
        const { id } = req.params;
        const chapter = await Chapter.findByIdAndUpdate(id, req.body, { new: true }).populate('sections');
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Chapter
const deleteChapter = async (req, res) => {
    try {
        const { id } = req.params;
        const chapter = await Chapter.findByIdAndDelete(id);
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//*************************** MODEL Section CRUD ******************************************************* */

// CREATE Section
const createSection = async (req, res) => {
    try {
        const section = new Section(req.body);
        await section.save();
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Section (populate contents)
const getSections = async (req, res) => {
    try {
        const sections = await Section.find().populate('contents');
        res.status(200).json(sections);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Section by ID (avec population du contenu associé)
const getSectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await Section.findById(id).populate('contents');
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Section
const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await Section.findByIdAndUpdate(id, req.body, { new: true }).populate('contents');
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Section
const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        const section = await Section.findByIdAndDelete(id);
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//*************************** MODEL Content CRUD ******************************************************* */

// CREATE Content
const createContent = async (req, res) => {
    try {
        const content = new Content(req.body);
        await content.save();
        res.status(201).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Content
const getContents = async (req, res) => {
    try {
        const contents = await Content.find();
        res.status(200).json(contents);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Content by ID (avec population de la section associée)
const getContentById = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findById(id).populate('sectionId');
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Content
const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findByIdAndUpdate(id, req.body, { new: true }).populate('sectionId');
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Content
const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findByIdAndDelete(id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//*************************** MODEL Quiz CRUD ******************************************************* */

// CREATE Quiz
const createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Quiz (populate questions)
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Quiz by ID (avec population des parties et questions associées)
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id)
            .populate('partId')
            .populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Quiz
const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true })
            .populate('partId')
            .populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Quiz
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findByIdAndDelete(id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//*************************** MODEL Question CRUD ******************************************************* */

// CREATE Question
const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ Question
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET Question by ID (avec population du quiz associé)
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id)
            .populate('quizId');  // On peuple le quiz auquel appartient la question
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE Question
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndUpdate(id, req.body, { new: true })
            .populate('quizId');  // On peuple le quiz auquel appartient la question
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Question
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(204).json(); // No content (suppression réussie)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



//*************************** MODEL CourseLearned CRUD ******************************************************* */

// GET all CourseLearneds pour un utilisateur avec population de l'utilisateur et du cours
const getCourseLearneds = async (req, res) => {
    try {
        const { userId } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête

        const courseLearneds = await CourseLearned.find({ userId }) // Filtrer par userId
            .populate('courseId')  // Peupler les détails du cours associé
            .populate('userId');    // Peupler les informations de l'utilisateur

        if (!courseLearneds.length) {
            return res.status(404).json({ message: 'Aucun cours appris trouvé pour cet utilisateur.' });
        }

        res.status(200).json(courseLearneds); // Réponse avec tous les cours appris
    } catch (error) {
        res.status(400).json({ message: error.message }); // Gérer les erreurs
    }
};


// GET CourseLearned by ID (avec population de l'utilisateur et du cours)
const getCourseLearnedById = async (req, res) => {
    try {
        const { id } = req.params;
        const courseLearned = await CourseLearned.findById(id)
            .populate('userId')     // Peupler l'utilisateur (User)
            .populate('courseId');  // Peupler le cours (Course)
        if (!courseLearned) {
            return res.status(404).json({ message: 'CourseLearned not found' });
        }
        res.status(200).json(courseLearned);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// CREATE CourseLearned (Track progress)
const createCourseLearned = async (req, res) => {
    try {
        const courseLearned = new CourseLearned(req.body);
        await courseLearned.save();
        res.status(201).json(courseLearned);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE CourseLearned
const updateCourseLearned = async (req, res) => {
    try {
        const { id } = req.params;
        const courseLearned = await CourseLearned.findByIdAndUpdate(id, req.body, { new: true })
            .populate('userId')     // Peupler l'utilisateur (User)
            .populate('courseId');  // Peupler le cours (Course)
        if (!courseLearned) {
            return res.status(404).json({ message: 'CourseLearned not found' });
        }
        res.status(200).json(courseLearned);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE CourseLearned
const deleteCourseLearned = async (req, res) => {
    try {
        const { id } = req.params;
        const courseLearned = await CourseLearned.findByIdAndDelete(id);
        if (!courseLearned) {
            return res.status(404).json({ message: 'CourseLearned not found' });
        }
        res.status(204).json(); // No content (suppression réussie)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE CourseLearnedProgress
const updateCourseLearnedProgess = async (req, res) => {
    const { userId, courseId, progress } = req.body;
  
    // Validation des données d'entrée
    if (!userId || !courseId || typeof progress === 'undefined') {
      return res.status(400).json({ error: 'Données manquantes ou invalides' });
    }
  
    try {
      // Rechercher la progression existante
      let course = await CourseLearned.findOne({ userId, courseId });
  
      if (!course) {
        // Si la progression n'existe pas, créer un nouvel enregistrement
        course = new CourseLearned({
          userId,
          courseId,
          startedAt: new Date(),
          progress,
          completedAt: progress === 100 ? new Date() : null,
        });
        await course.save();
        return res.status(201).json({ message: 'Progression créée avec succès', data: course });
      }
  
      // Si la progression existe, mettre à jour
      course.progress = progress;
      if (progress === 100) {
        course.completedAt = new Date(); // Marquer comme terminé
      }
      await course.save();
  
      res.status(200).json({ message: 'Progression mise à jour avec succès', data: course });
    } catch (error) {
      console.error('Erreur côté serveur :', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la progression' });
    }
};
  
  

//*************************** MODEL CourseReview CRUD ******************************************************* */
// CREATE CourseReview (Rate course)
const createCourseReview = async (req, res) => {
    try {
        const courseReview = new CourseReview(req.body);
        await courseReview.save();
        res.status(201).json(courseReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ CourseReview
const getCourseReviews = async (req, res) => {
    try {
        const courseReviews = await CourseReview.find().populate('userId courseId');
        res.status(200).json(courseReviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET CourseReview by ID (avec population de l'utilisateur et du cours)
const getCourseReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const courseReview = await CourseReview.findById(id)
            .populate('userId')     // Peupler l'utilisateur (User)
            .populate('courseId');  // Peupler le cours (Course)
        if (!courseReview) {
            return res.status(404).json({ message: 'CourseReview not found' });
        }
        res.status(200).json(courseReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE CourseReview
const updateCourseReview = async (req, res) => {
    try {
        const { id } = req.params;
        const courseReview = await CourseReview.findByIdAndUpdate(id, req.body, { new: true })
            .populate('userId')     // Peupler l'utilisateur (User)
            .populate('courseId');  // Peupler le cours (Course)
        if (!courseReview) {
            return res.status(404).json({ message: 'CourseReview not found' });
        }
        res.status(200).json(courseReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE CourseReview
const deleteCourseReview = async (req, res) => {
    try {
        const { id } = req.params;
        const courseReview = await CourseReview.findByIdAndDelete(id);
        if (!courseReview) {
            return res.status(404).json({ message: 'CourseReview not found' });
        }
        res.status(204).json(); // No content (suppression réussie)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//***************************************** Methodes Exportation ********************************************** */
export {
    getDomains, getDomainById, createDomain, updateDomain, deleteDomain,
    getCourses, getCourseById, createCourse, updateCourse, deleteCourse,
    getParts, getPartById, createPart, updatePart, deletePart,
    getChapters, getChapterById, createChapter, updateChapter, deleteChapter,
    getSections, getSectionById, createSection, updateSection, deleteSection,
    getContents, getContentById, createContent, updateContent, deleteContent,
    getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz,
    getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion,
    getCourseLearneds, getCourseLearnedById, createCourseLearned, updateCourseLearnedProgess, updateCourseLearned, deleteCourseLearned,
    getCourseReviews, getCourseReviewById, createCourseReview, updateCourseReview, deleteCourseReview
}