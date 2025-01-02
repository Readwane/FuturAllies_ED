import { environment } from "src/environments/environment";

export class CourseLearned {
  userId: string;
  courseId: string;
  startedAt: Date;
  completedAt?: Date;
  progress: number;

  constructor(
    userId: string,
    courseId: string,
    startedAt: Date = new Date(),
    progress: number = 0.0,
  ) 
  {
    this.userId = userId;
    this.courseId = courseId;
    this.startedAt = startedAt;
    this.progress = progress;
  }

  // Nouvelle méthode : Envoie la progression au serveur
  async saveProgress(): Promise<void> {
    const response = await fetch(`${environment.apiBaseUrl}/courses-learned`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.userId,
        courseId: this.courseId,
        startedAt: this.startedAt,
        completedAt: this.completedAt,
        progress: this.progress,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde de la progression');
    }
  }

  // Nouvelle méthode : Mettre à jour la progression
  async updateProgress(newProgress: number): Promise<void> {
    this.progress = newProgress;

    const response = await fetch(`${environment.apiBaseUrl}/courses-learned`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: this.userId,
        courseId: this.courseId,
        progress: this.progress,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la progression');
    }
  }
}
