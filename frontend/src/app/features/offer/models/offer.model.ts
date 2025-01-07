export class Offer {  
  _id: string;  // Identifiant unique de l'offre
  enterpriseId: string;  // Identifiant de l'entreprise associée à l'offre            
  title: string;  // Titre de l'offre  
  description: string;  // Description de l'offre  
  domain: string;  // Domaine de l'offre (ex: développement web, marketing, etc.)
  location: string;  // Lieu où se situe l'offre (ville, pays)   
  type: 'Job' | 'Internship' | 'Other';  // Type de l'offre ("Job", "Internship", "Other")  
  salary?: number;  // Salaire proposé pour l'offre (facultatif)
  duration?: number;  // Durée de l'offre, applicable principalement pour un stage ou CDD (facultatif)
  requirements?: string;  // Exigences ou qualifications nécessaires pour le poste (facultatif)
  responsibilities?: string;  // Responsabilités liées à l'offre (facultatif)
  educationLevel?: string;  // Niveau d'éducation requis pour l'offre (facultatif)
  experienceLevel?: string;  // Niveau d'expérience requis pour l'offre (facultatif)
  contractType?: 'CDI' | 'CDD';  // Type de contrat pour l'offre ("CDI" ou "CDD", facultatif)
  contactEmail: string;  // Email de contact pour l'offre  
  status: 'Open' | 'Closed' | 'Pending';  // Statut de l'offre ("Open", "Closed", "Pending")   
  isRemote: boolean;  // Indicateur si l'offre peut être réalisée en télétravail (true ou false)  
  applicationMode: 'Online' | 'Physical' | 'Both';  // Mode de soumission de la candidature ("Online", "Physical", ou "Both")  
  physicalAddress?: string;  // Adresse physique pour les candidatures en personne (facultatif)
  isRequiredCvDoc: boolean;  // Indicateur si le CV est requis pour la candidature        
  isRequiredMlDoc: boolean;  // Indicateur si la lettre de motivation est requise pour la candidature      
  canAddOthersDoc: boolean;  // Indicateur si d'autres documents peuvent être ajoutés lors de la candidature  
  postedDate?: Date;  // Date de publication de l'offre (facultatif)
  expirationDate: Date;  // Date d'expiration de l'offre     

  constructor(  
    _id: string, 
    enterpriseId: string,           
    title: string,  
    description: string,  
    domain: string,  
    location: string,  
    type: 'Job' | 'Internship' | 'Other',   
    contactEmail: string,  
    isRemote: boolean = false,  
    expirationDate: Date, 
    status: 'Open' | 'Closed' | 'Pending' = 'Open',  
    applicationMode: 'Online' | 'Physical' | 'Both' = 'Online',  
    isRequiredCvDoc: boolean = true,  
    isRequiredMlDoc: boolean = false,  
    canAddOthersDoc: boolean = false,  
    contractType?: 'CDI' | 'CDD', 
    salary?: number,  
    duration?: number,  
    requirements?: string,  
    responsibilities?: string,  
    educationLevel?: string,  
    experienceLevel?: string,   
    physicalAddress?: string,  
  ) {  
    this._id = _id;  
    this.enterpriseId = enterpriseId; 
    this.title = title;  
    this.description = description;  
    this.domain = domain;  
    this.location = location;  
    this.type = type;  
    this.contractType = contractType;  
    this.contactEmail = contactEmail;   
    this.isRemote = isRemote;  
    this.expirationDate = expirationDate;  
    this.status = status;  
    this.applicationMode = applicationMode;  
    this.isRequiredCvDoc = isRequiredCvDoc;  
    this.isRequiredMlDoc = isRequiredMlDoc;  
    this.canAddOthersDoc = canAddOthersDoc;   
    if (salary !== undefined) this.salary = salary;  
    if (duration !== undefined) this.duration = duration;  
    if (requirements) this.requirements = requirements;  
    if (responsibilities) this.responsibilities = responsibilities;  
    if (educationLevel) this.educationLevel = educationLevel;  
    if (experienceLevel) this.experienceLevel = experienceLevel;  
    if (physicalAddress) this.physicalAddress = physicalAddress;  
  }  
}