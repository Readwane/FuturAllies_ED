import { TrainingOrganizer } from "./training-organizer.model";
import { TrainingStatus } from "./training-status.enum";
import { TrainingType } from "./training-type.enum";
import { Training } from "./training.model";

export class TrainingPackPartner extends Training {
    constructor(
      id: string,
      title: string,
      description: string,
      startDate: Date,
      endDate: Date,
      duration: number,
      location: string,
      maxParticipants: number,
      trainer: string,
      price: number,
      public partnerName: string  // Nom du partenaire externe
    ) {
      super(id, title, description, startDate, endDate, location, maxParticipants, trainer, TrainingType.TrainingPackPartner, TrainingStatus.Open, price, false, new TrainingOrganizer('PartnerID', partnerName, 'contact@partner.com'));
    }
  }
  