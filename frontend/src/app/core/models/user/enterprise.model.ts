export class Enterprise {  
    _id: string;  // reference l'id de l'utilisateur correspondant
    name: string;  
    location: string;  
    recruitmentEmail: string;
    size: string; // Par exemple: "Small", "Medium", "Large"  
    website: string;  
    description?: string;  
    industry?: string;  
    foundedYear?: number;  
    headquartersLocation?: string;  
    numberOfEmployees?: number;  
    companyCulture?: string;  
    socialMediaLinks?: { [platform: string]: string };  
    rating?: number; // Note sur 5  
    awardsAndRecognition?: string[];  
    benefitsOverview?: string;  
    logoUrl?: string;  
  
    constructor(  
      _id: string,   
      name: string,   
      location: string,   
      recruitmentEmail: string,
      size: "SMALL" | "MEDIUM" | "LARGE" ,  
      website: string,  
      description?: string,  
      industry?: string,  
      foundedYear?: number,  
      headquartersLocation?: string,  
      numberOfEmployees?: number,  
      companyCulture?: string,  
      socialMediaLinks?: { [platform: string]: string },  
      rating?: number,  
      awardsAndRecognition?: string[],  
      benefitsOverview?: string,  
      logoUrl?: string  
    ) {  
      this._id = _id;  
      this.name = name;  
      this.location = location;  
      this.recruitmentEmail = recruitmentEmail;
      this.size = size;  
      this.website = website;  
      if (description) this.description = description;  
      if (industry) this.industry = industry;  
      if (foundedYear) this.foundedYear = foundedYear;  
      if (headquartersLocation) this.headquartersLocation = headquartersLocation;  
      if (numberOfEmployees) this.numberOfEmployees = numberOfEmployees;  
      if (companyCulture) this.companyCulture = companyCulture;  
      if (socialMediaLinks) this.socialMediaLinks = socialMediaLinks;  
      if (rating) this.rating = rating;  
      if (awardsAndRecognition) this.awardsAndRecognition = awardsAndRecognition;  
      if (benefitsOverview) this.benefitsOverview = benefitsOverview;  
      if (logoUrl) this.logoUrl = logoUrl;  
    }  
  }