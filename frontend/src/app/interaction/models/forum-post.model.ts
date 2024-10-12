import { ForumReply } from "./forum-reply.model";
export class ForumPost {
    constructor(
      public id: string,  // Identifiant unique du post
      public userId: string,  // Identifiant de l'auteur du post
      public courseId: string,  // Identifiant du cours concerné
      public content: string,  // Contenu du post
      public replies: ForumReply[],  // Liste des réponses au post
      public createdDate: Date  // Date de création du post
    ) {}
  }