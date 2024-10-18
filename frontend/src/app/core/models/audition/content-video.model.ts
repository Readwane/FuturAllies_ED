import { Content } from "./content.model";

export class ContentVideo extends Content {
    content_url: string;

    constructor(
        _id: string, 
        contentId: string, 
        content_url: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        super(_id, contentId, 'video', createdAt, updatedAt);
        this.content_url = content_url;
    }
}
