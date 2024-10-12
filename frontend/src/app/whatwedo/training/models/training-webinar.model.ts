import { TrainingOrganizer } from "./training-organizer.model";
import { TrainingStatus } from "./training-status.enum";
import { TrainingType } from "./training-type.enum";
import { Training } from "./training.model";

export class Webinar extends Training {
    constructor(
      id: string,
      title: string,
      description: string,
      startDate: Date,
      endDate: Date,
      duration: number,
      public webinarUrl: string,  // URL d'accès au webinaire
      maxParticipants: number,
      trainer: string,
      price: number
    ) {
        super(id, title, description, startDate, endDate, 'En ligne', maxParticipants, trainer, TrainingType.Webinaire, TrainingStatus.Open, price, true, new TrainingOrganizer('Fidalli', 'Fidalli Expertise Comptable', 'contact@fidalli.com'));    }
  }
  