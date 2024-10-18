import { Content } from "./content.model";

export class ContentText extends Content {
    content: string[];

    constructor(
        _id: string, 
        contentId: string, 
        content: string[],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        super(_id, contentId, 'text', createdAt, updatedAt);
        this.content = content;
    }
}
