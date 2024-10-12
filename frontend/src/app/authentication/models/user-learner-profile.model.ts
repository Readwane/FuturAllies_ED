import { Course } from "src/app/services/audition/models/course.model";
import { CourseProgress } from "src/app/services/audition/models/course-progress.model";
import { UserActivityLog } from "src/app/interaction/models/user-activity-log.model";
import { Certification } from "src/app/services/audition/models/certification.model";


export class UserLearnerProfile {
    constructor(
      public userId: string,  // Lien vers l'utilisateur
      public coursesEnrolled: Course[],  // Liste des cours auxquels il est inscrit
      public progress: { [courseId: string]: CourseProgress },  // Progrès de l'apprenant dans chaque cours
      public interests: string[],  // Centres d'intérêt ou domaines d'études préférés
      public bookmarks: string[],  // Cours marqués comme favoris
      public activityLog: UserActivityLog[],  // Historique de ses activités sur la plateforme
      public certificationsEarned: Certification[]  // Certifications obtenues
    ) {}
  }
  