export class TrainingSession {
    _id: string;           // Identifiant unique de la séance
    trainingModule_id: string;            // Identifiant du module associé
    title: string;                // Titre de la séance
    description: string;          // Description détaillée de la séance
    duration: number;             // Durée de la séance en minutes
    sessionDate: Date;
    order: number;                // Ordre de la séance dans le module
    created_at: Date;             // Date de création de la séance
    updated_at: Date;             // Date de la dernière mise à jour de la séance
  
    constructor(
      _id: string,
      trainingModule_id: string,
      title: string,
      description: string,
      duration: number,
      sessionDate: Date = new Date(),
      order: number,
      created_at: Date = new Date(),
      updated_at: Date = new Date()
    ) {
      this._id = _id;
      this.trainingModule_id = trainingModule_id;
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.sessionDate = sessionDate;
      this.order = order;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  