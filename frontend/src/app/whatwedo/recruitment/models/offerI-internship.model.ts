import { OfferContractType } from "./offer-contract-type.enum";
import { OfferStatus } from "./offer-status.enum";
import { Offer } from "./offer.model";

export class OfferInternship extends Offer {
    constructor(
      id: string,
      title: string,
      description: string,
      company: string,
      location: string,
      public duration: number,  // Durée du stage en mois
      salary: number,
      startDate: Date,
      endDate: Date,
      requirements: string[],
      postedBy: string,
      status: OfferStatus
    ) {
      super(id, title, description, company, location, salary, OfferContractType.Internship, startDate, endDate, requirements, postedBy, status);
    }
  }
  