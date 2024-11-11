export class TrainingModule {
    _id: string;
    training_id: string;         // Identifiant de la formation associée
    title: string;               // Titre du module
    description: string;         // Description détaillée du module
    duration: number;            // Durée du module en heures
    order: number;               // Ordre du module dans la formation
    objectives: string[];        // Objectifs pédagogiques du module
    content: string;             // Contenu principal du module
    resources: string[];         // Liens ou références vers des ressources supplémentaires
    assessment: string;          // Méthode d'évaluation pour ce module
    prerequisites?: string[];    // Prérequis nécessaires avant de suivre ce module
    created_at: Date;            // Date de création du module
    updated_at: Date;            // Date de la dernière mise à jour du module
  
    constructor(
        _id: string,
      training_id: string,
      title: string,
      description: string,
      duration: number,
      order: number,
      objectives: string[],
      content: string,
      resources: string[],
      assessment: string,
      prerequisites?: string[],
      created_at: Date = new Date(),
      updated_at: Date = new Date()
    ) {
        this._id = _id;
      this.training_id = training_id;
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.order = order;
      this.objectives = objectives;
      this.content = content;
      this.resources = resources;
      this.assessment = assessment;
      this.prerequisites = prerequisites;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  