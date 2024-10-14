import { Content } from "./content.model";

export class ContentText extends Content {
    content: string[];

    constructor(
        id: number, 
        chapterId: number, 
        content: string[],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        super(id, chapterId, 'text', createdAt, updatedAt);
        this.content = content;
    }
}
