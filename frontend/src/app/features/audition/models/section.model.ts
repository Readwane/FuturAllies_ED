import { Content } from "./content.model";

export class Section{
    chapterId: string;
    title: string;
    order: number;
    contents?: Content[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
        chapterId: string,
        title: string,
        order: number,
        contents?: Content[],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    )
    {
        this.chapterId = chapterId;
        this.title = title;
        this.order = order;
        this.contents = contents;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}