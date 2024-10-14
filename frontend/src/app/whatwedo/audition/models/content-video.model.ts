import { Content } from "./content.model";

export class ContentVideo extends Content {
    content_url: string;

    constructor(
        id: number, 
        chapterId: number, 
        content_url: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        super(id, chapterId, 'video', createdAt, updatedAt);
        this.content_url = content_url;
    }
}
