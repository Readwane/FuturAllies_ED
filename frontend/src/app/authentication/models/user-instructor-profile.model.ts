import { Course } from "src/app/services/audition/models/course.model";
import { CourseReview } from "src/app/services/audition/models/course-review.model";

export class UserInstructorProfile {
    constructor(
      public userId: string,  // Lien vers l'utilisateur
      public coursesTaught: Course[],  // Liste des cours enseignés ou créés
      public bio: string,  // Courte biographie ou résumé professionnel
      public ratings: number[],  // Évaluations moyennes de ses cours
      public reviews: CourseReview[],  // Commentaires laissés par les apprenants
      public qualifications: string[],  // Qualifications ou diplômes de l'instructeur
      public socialLinks?: { [key: string]: string }  // Liens vers les réseaux sociaux ou site web
    ) {}
  }
  