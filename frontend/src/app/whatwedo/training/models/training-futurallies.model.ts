import { TrainingOrganizer } from "./training-organizer.model";
import { TrainingStatus } from "./training-status.enum";
import { TrainingType } from "./training-type.enum";
import { Training } from "./training.model";

export class TrainingFuturAllies extends Training {
    constructor(
      id: string,
      title: string,
      description: string,
      startDate: Date,
      endDate: Date,
      location: string,
      maxParticipants: number,
      trainer: string,
      price: number,
      public certificationsOffered: string[]  // Certifications délivrées à l'issue de la formation
    ) {
      super(id, title, description, startDate, endDate, location, maxParticipants, trainer, TrainingType.TrainingFuturAllies, TrainingStatus.Open, price, false, new TrainingOrganizer('Fidalli', 'Fidalli Expertise Comptable', 'contact@fidalli.com'));
    }
  }
  