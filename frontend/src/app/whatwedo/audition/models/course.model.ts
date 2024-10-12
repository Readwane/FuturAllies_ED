import { Quiz } from "./quiz.model";
import { Chapter } from "./chapter.model";
import { Certification } from "./certification.model";
import { Instructor } from "./instructor.model";
import { CourseContentVideo } from "./course-content-video.model";

export class Course {
    constructor(
      public id: string,  // Identifiant unique du cours
      public title: string,  // Titre du cours
      public description: string,  // Brève description du contenu du cours
      public duration: number,  // Durée estimée en heures ou semaines
      public level: string,  // Niveau de difficulté (Débutant, Intermédiaire, Avancé)
      public category: string,  // Catégorie du cours (ex. Informatique, Management)
      public modules: Chapter[],  // Liste des modules/chapitres du cours
      public quizzes: Quiz[],  // Évaluations à la fin de chaque chapitre
      public certification: Certification,  // Information sur la certification offerte
      public instructors: Instructor[],  // Liste des enseignants ou créateurs du cours
      public prerequisites: string[],  // Prérequis pour suivre le cours
      public tools: string[],  // Outils nécessaires pour suivre le cours (ex : logiciels, matériel)
      public createdDate: Date,  // Date de création du cours
      public updatedDate: Date,  // Date de mise à jour la plus récente
      public videos: CourseContentVideo[],  // URL d'une vidéo de présentation ou contenu multimédia
      public language: string,  // Langue du cours
      public tags: string[]  // Liste des tags associés au cours
    ) {}
  }
  