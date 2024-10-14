export class Training {
  id: number;  // Identifiant unique de la formation
  title: string;  // Titre de la formation
  description: string;  // Description détaillée de la formation
  location: string;  // Lieu de la formation (adresse ou "En ligne" pour les webinaires)
  startDate: Date;  // Date de début de la formation
  endDate: Date;  // Date de fin de la formation
  duration?: number;  // Durée totale de la formation (en heures ou jours)
  maxParticipants: number;  // Nombre maximum de participants
  currentParticipants?: number;  // Nombre actuel de participants (optionnel)
  trainer: string;  // Nom ou référence de l'intervenant principal
  type: 'webinar' | 'in-person';  // Type de la formation
  category: 'Talent' | 'Cafe-allies' | 'Commercial-entreprise' | 'Commercial-etudiant';  // Catégorie de la formation
  status: 'Open' | 'Closed' | 'Pending';  // Statut de la formation
  price: number;  // Prix de la formation
  organizer: string;  // Organisateur de la formation
  prerequisites?: string;  // Compétences requises avant la formation
  learningObjectives?: string;  // Objectifs pédagogiques de la formation
  assessmentMethod?: string;  // Modalités d'évaluation
  trainingMaterials?: string;  // Supports pédagogiques fournis
  certificateIssued: boolean;  // Indique si un certificat est délivré
  language?: string;  // Langue de la formation

  constructor(
    id: number,
    title: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    maxParticipants: number,
    trainer: string,
    type: 'webinar' | 'in-person',  // Type de la formation
    category: 'Talent' | 'Cafe-allies' | 'Commercial-entreprise' | 'Commercial-etudiant',  // Catégorie de la formation
    status: 'Open' | 'Closed' | 'Pending' = 'Open',
    price: number,
    organizer: string,
    duration?: number,
    currentParticipants?: number,
    prerequisites?: string,
    learningObjectives?: string,
    assessmentMethod?: string,
    trainingMaterials?: string,
    certificateIssued: boolean = false,
    language?: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxParticipants = maxParticipants;
    this.trainer = trainer;
    this.type = type;
    this.category = category;
    this.status = status;
    this.price = price;
    this.organizer = organizer;
    this.duration = duration;
    this.currentParticipants = currentParticipants;
    this.prerequisites = prerequisites;
    this.learningObjectives = learningObjectives;
    this.assessmentMethod = assessmentMethod;
    this.trainingMaterials = trainingMaterials;
    this.certificateIssued = certificateIssued;
    this.language = language;
  }
}
