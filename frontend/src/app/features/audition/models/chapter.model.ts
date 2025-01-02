import { Section } from "./section.model";

export class Chapter {
  _id: string;
  partId: string;
  title: string;
  description?: string;
  order: number;
  sections?: Section[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    _id: string,
    partId: string,
    title: string,
    order: number,
    sections: Section[],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = _id;
    this.partId = partId;
    this.title = title;
    this.order = order;
    this.sections = sections;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
