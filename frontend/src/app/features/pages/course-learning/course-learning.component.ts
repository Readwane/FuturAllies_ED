import { Component } from '@angular/core';

@Component({
  selector: 'app-suivi-cours',
  templateUrl: './course-learning.component.html',
  styleUrls: ['./course-learning.component.css']
})
export class CourseLearningComponent {
  courseTitle = "Titre du Cours";
  isCourseCompleted = false; // Propriété déclarée ici
  courseId = 1; // Exemple d'ID de cours

  courseParts = [
    {
      title: 'Partie 1',
      chapters: [
        {
          title: 'Chapitre 1',
          lessons: [
            { title: 'Leçon 1', completed: false },
            { title: 'Leçon 2', completed: false }
          ],
          quizzes: [
            { title: 'Quiz 1', completed: false }
          ]
        }
      ]
    }
  ];

  // Méthodes ici...
  toggleLesson(lesson: any) {
    lesson.completed = !lesson.completed;
    this.checkChapterCompletion(lesson);
    this.checkPartCompletion(lesson);
    this.checkCourseCompletion();
  }

  toggleQuiz(quiz: any) {
    quiz.completed = !quiz.completed;
    this.checkChapterCompletion(quiz);
    this.checkPartCompletion(quiz);
    this.checkCourseCompletion();
  }

  checkChapterCompletion(item: any) {
    const chapter = this.courseParts.flatMap(part => part.chapters).find(ch => ch.lessons.includes(item) || ch.quizzes.includes(item));
    if (chapter) {
      const allLessonsCompleted = chapter.lessons.every(lesson => lesson.completed);
      const allQuizzesCompleted = chapter.quizzes.every(quiz => quiz.completed);
      if (allLessonsCompleted && allQuizzesCompleted) {
        // chapter.completed = true;
      }
    }
  }

  checkPartCompletion(item: any) {
    const part = this.courseParts.find(part => part.chapters.some(ch => ch.lessons.includes(item) || ch.quizzes.includes(item)));
    // if (part) {
    //   const allChaptersCompleted = part.chapters.every(ch => ch.completed);
    //   if (allChaptersCompleted) {
    //     part.completed = true;
    //   }
    // }
  }

  checkCourseCompletion() {
    this.isCourseCompleted = this.courseParts.every(part => this.isPartCompleted(part));
  }

  isPartCompleted(part: any) {
    // return part.chapters.every(ch => ch.completed);
  }

  isChapterCompleted(chapter: any) {
    // return chapter.lessons.every(lesson => lesson.completed) && chapter.quizzes.every(quiz => quiz.completed);
  }
}
