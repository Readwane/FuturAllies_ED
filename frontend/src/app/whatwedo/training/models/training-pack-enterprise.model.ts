import { TrainingOrganizer } from "./training-organizer.model";
import { TrainingStatus } from "./training-status.enum";
import { TrainingType } from "./training-type.enum";
import { Training } from "./training.model";

export class TraingPackEntreprise extends Training {
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
    public clientCompany: string,  // Nom de l'entreprise cliente
    public isOnSite: boolean  // Indique si la formation est chez Fidalli ou chez le client
  ) {
    super(id, title, description, startDate, endDate, location, maxParticipants, trainer, TrainingType.TrainingPackEntreprise, TrainingStatus.Open, price, false, new TrainingOrganizer('Fidalli', 'Fidalli Expertise Comptable', 'contact@fidalli.com'));
  }
}
