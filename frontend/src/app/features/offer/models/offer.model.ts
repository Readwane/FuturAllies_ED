export class Offer {  
  _id: string;  
  enterpriseId: string;             // Added enterpriseId to link to the Enterprise  
  title: string;  
  description: string;  
  domain: string;  
  location: string;  
  salary?: number;  
  duration?: number;  
  type: 'Job' | 'Internship' | 'Other';  
  requirements?: string;  
  responsibilities?: string;  
  educationLevel?: string;  
  experienceLevel?: string;  
  contractType?: 'CDI' | 'CDD' | 'INTERNSHIP'  
  contactEmail: string;  
  postedDate?: Date;  
  expirationDate: Date;  
  status: 'Open' | 'Closed' | 'Pending';  
  // Remote and application details  
  isRemote: boolean;  
  applicationMode: 'Online' | 'Physical' | 'Both';  
  physicalAddress?: string;  
  // Document requirements  
  isRequiredCvDoc: boolean;        
  isRequiredMlDoc: boolean;      
  canAddOthersDoc: boolean;       

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
    contractType?: 'CDI' | 'CDD' | 'INTERNSHIP', 
    salary?: number,  
    duration?: number,  
    requirements?: string,  
    responsibilities?: string,  
    educationLevel?: string,  
    experienceLevel?: string,   
    physicalAddress?: string,  
  ) {  
    this._id = _id;  
    this.enterpriseId = enterpriseId; // Assign enterpriseId 
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
    // Document requirements  
    this.isRequiredCvDoc = isRequiredCvDoc;  
    this.isRequiredMlDoc = isRequiredMlDoc;  
    this.canAddOthersDoc = canAddOthersDoc;  
    // Assign optional properties  
    if (salary !== undefined) this.salary = salary;  
    if (duration !== undefined) this.duration = duration;  
    if (requirements) this.requirements = requirements;  
    if (responsibilities) this.responsibilities = responsibilities;  
    if (educationLevel) this.educationLevel = educationLevel;  
    if (experienceLevel) this.experienceLevel = experienceLevel;  
    if (physicalAddress) this.physicalAddress = physicalAddress;  
  }  
}