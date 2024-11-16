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
  contractType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Freelance' | 'Temporary';  
  benefits?: string;  
  contactEmail: string;  
  postedDate: Date;  
  expirationDate?: Date;  
  status: 'Open' | 'Closed' | 'Pending';  
  // Remote and application details  
  isRemote: boolean;  
  applicationMode: 'Online' | 'Physical' | 'Both';  
  onlineSubmission: boolean;  
  physicalAddress?: string;  
  // Document requirements  
  isRequiredCvDoc: boolean;         // Indicates if a CV is required  
  isRequiredMlDoc: boolean;         // Indicates if a motivation letter is required  
  canAddOthersDoc: boolean;         // Allows additional documents  
  // Additional offer info  
  applicationLink?: string;  
  additionalInfo?: string;  

  constructor(  
    _id: string, 
    enterpriseId: string,           // Added enterpriseId parameter   
    title: string,  
    description: string,  
    domain: string,  
    location: string,  
    type: 'Job' | 'Internship' | 'Other',  
    contractType: 'Full-Time' | 'Part-Time' | 'Internship' | 'Freelance' | 'Temporary',  
    contactEmail: string,  
    isRemote: boolean = false,  
    postedDate: Date = new Date(),  
    status: 'Open' | 'Closed' | 'Pending' = 'Open',  
    applicationMode: 'Online' | 'Physical' | 'Both' = 'Online',  
    isRequiredCvDoc: boolean = true,  
    isRequiredMlDoc: boolean = false,  
    canAddOthersDoc: boolean = false,  
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
    this.enterpriseId = enterpriseId; // Assign enterpriseId 
    this.title = title;  
    this.description = description;  
    this.domain = domain;  
    this.location = location;  
    this.type = type;  
    this.contractType = contractType;  
    this.contactEmail = contactEmail;   
    this.isRemote = isRemote;  
    this.postedDate = postedDate;  
    this.status = status;  
    this.applicationMode = applicationMode;  
    this.onlineSubmission = onlineSubmission;  
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
    if (benefits) this.benefits = benefits;  
    if (applicationLink) this.applicationLink = applicationLink;  
    if (expirationDate) this.expirationDate = expirationDate;  
    if (physicalAddress) this.physicalAddress = physicalAddress;  
    if (additionalInfo) this.additionalInfo = additionalInfo;  
  }  
}