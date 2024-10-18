export class Quiz {
  id: number;
  partId: number;
  title: string;
  competencyAssessed: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    partId: number,
    title: string,
    competencyAssessed: string[],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.partId = partId;
    this.title = title;
    this.competencyAssessed = competencyAssessed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
