export class Certification {
    id: number;  // Identifiant unique de la certification
    title: string;  // Titre de la certification (ex: "Certification en Marketing Digital")
    description: string;  // Description de la certification (détails sur ce que la certification couvre)
    pathId: number;  // Identifiant du parcours de formation ou du cours associé
    issuer: string;  // Nom de l'organisme ou de l'institution qui délivre la certification
    issueDate: Date;  // Date à laquelle la certification a été délivrée
    expirationDate?: Date;  // Date d'expiration de la certification (si applicable)
    level: 'beginner' | 'intermediate' | 'advanced'; 
    requirements: string;  // Critères pour obtenir la certification (ex: réussir un test, compléter un projet)
    assessmentMethod: 'Quiz' | 'Project' | 'Exam' | 'Other';  // Méthode d'évaluation pour l'obtention de la certification
    isOnline: boolean;  // Indique si la certification est délivrée en ligne
    certificateTemplateUrl?: string;  // URL du modèle de certificat (pour téléchargement)
    badgeUrl?: string;  // URL pour le badge numérique (pour affichage sur les profils en ligne)
    status: 'Active' | 'Expired' | 'Pending' | 'Revoked';  // Statut de la certification
    recipientUserId: number;  // Identifiant de l'utilisateur qui a obtenu la certification
    skillsGained?: string[];  // Liste des compétences acquises par l'utilisateur grâce à la certification
    language: string;  // Langue dans laquelle la certification est délivrée
  
    constructor(
      id: number,
      title: string,
      description: string,
      pathId: number,
      issuer: string,
      issueDate: Date,
      level: 'beginner' | 'intermediate' | 'advanced',
      requirements: string,
      assessmentMethod: 'Quiz' | 'Project' | 'Exam' | 'Other',
      isOnline: boolean = true,
      status: 'Active' | 'Expired' | 'Pending' | 'Revoked' = 'Active',
      recipientUserId: number,
      expirationDate?: Date,
      certificateTemplateUrl?: string,
      badgeUrl?: string,
      skillsGained?: string[],
      language: string = 'English'
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.pathId = pathId;
      this.issuer = issuer;
      this.issueDate = issueDate;
      this.level = level;
      this.requirements = requirements;
      this.assessmentMethod = assessmentMethod;
      this.isOnline = isOnline;
      this.status = status;
      this.recipientUserId = recipientUserId;
      this.expirationDate = expirationDate;
      this.certificateTemplateUrl = certificateTemplateUrl;
      this.badgeUrl = badgeUrl;
      this.skillsGained = skillsGained;
      this.language = language;
    }
  }
  