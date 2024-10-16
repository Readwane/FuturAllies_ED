import { Content } from "./content.model";

export class ContentText extends Content {
    content: string[];

    constructor(
        id: number, 
        contentId: number, 
        content: string[],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        super(id, contentId, 'text', createdAt, updatedAt);
        this.content = content;
    }
}
