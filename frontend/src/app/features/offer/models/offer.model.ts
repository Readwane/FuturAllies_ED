import { Doc } from "../../user/models/doc.model";  

export class Offer {  
  _id: string;  
  title: string; // Titre de l'offre  
  description: string; // Description de l'offre  
  domain: string; // Domaine de l'offre  
  company: string; // Société proposant l'offre  
  location: string; // Lieu de l'offre (ville, pays)  
  salary?: number; // Salaire pour les emplois (optionnel)  
  duration?: number; // Durée en mois pour les stages (optionnel)  
  type: 'Job' | 'Internship' | 'Other'; // Type d'offre  
  requirements?: string; // Compétences et qualifications requises (texte)  
  responsibilities?: string; // Responsabilités du poste (texte)  
  educationLevel?: string; // Niveau d'études requis (ex: Bac+3, Master, etc.)  
  experienceLevel?: string; // Niveau d'expérience requis (ex: Junior, Senior, etc.)  
  contractType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Freelance' | 'Temporary'; // Type de contrat  
  benefits?: string; // Avantages associés à l'offre (assurances, tickets restaurant, etc.)  
  applicationLink?: string; // Lien vers le formulaire de candidature externe  
  contactEmail: string; // Email de contact pour les candidatures  
  isRemote: boolean; // Indique si le poste est en télétravail  
  postedDate: Date; // Date de publication de l'offre  
  expirationDate?: Date; // Date d'expiration de l'offre  
  status: 'Open' | 'Closed' | 'Pending'; // Statut de l'offre  
  applicationMode: 'Online' | 'Physical' | 'Both'; // Mode de dépôt des candidatures  
  requiredDocuments?: Doc[]; // Liste des documents requis (CV, lettre de motivation, etc.)  
  physicalAddress?: string; // Adresse physique pour le dépôt des candidatures  
  onlineSubmission: boolean; // Indique si la soumission peut être faite en ligne  
  additionalInfo?: string; // Informations additionnelles à l'offre  
companyLocation: any;
companySize: any;
companyWebsite: any;

  constructor(  
    _id: string,  
    title: string,  
    description: string,  
    domain: string,  
    company: string,  
    location: string,  
    type: 'Job' | 'Internship' | 'Other',  
    contractType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Freelance' | 'Temporary',  
    contactEmail: string,  
    isRemote: boolean = false,  
    postedDate: Date = new Date(),  
    status: 'Open' | 'Closed' | 'Pending' = 'Open',  
    applicationMode: 'Online' | 'Physical' | 'Both' = 'Online',  
    requiredDocuments?: Doc[],  
    onlineSubmission: boolean = true,  
    salary?: number,  
    duration?: number,  
    requirements?: string,  
    responsibilities?: string,  
    educationLevel?: string,  
    experienceLevel?: string,  
    benefits?: string,  
    applicationLink?: string,  
    expirationDate?: Date,  
    physicalAddress?: string,  
    additionalInfo?: string  
  ) {  
    this._id = _id;  
    this.title = title;  
    this.description = description;  
    this.domain = domain;  
    this.company = company;  
    this.location = location;  
    this.type = type;  
    this.contractType = contractType;  
    this.contactEmail = contactEmail;  
    this.isRemote = isRemote;  
    this.postedDate = postedDate;  
    this.status = status;  
    this.applicationMode = applicationMode;  
    this.onlineSubmission = onlineSubmission;  

    // Assignation des propriétés optionnelles  
    if (salary !== undefined) this.salary = salary;  
    if (duration !== undefined) this.duration = duration;  
    if (requirements) this.requirements = requirements;  
    if (responsibilities) this.responsibilities = responsibilities;  
    if (educationLevel) this.educationLevel = educationLevel;  
    if (experienceLevel) this.experienceLevel = experienceLevel;  
    if (benefits) this.benefits = benefits;  
    if (applicationLink) this.applicationLink = applicationLink;  
    if (expirationDate) this.expirationDate = expirationDate;  
    if (physicalAddress) this.physicalAddress = physicalAddress;  
    if (additionalInfo) this.additionalInfo = additionalInfo;  
    if (requiredDocuments) this.requiredDocuments = requiredDocuments;  
  }  
}