
export class ForumReply {
    constructor(
      public id: string,  // Identifiant unique de la réponse
      public userId: string,  // Identifiant de l'auteur de la réponse
      public postId: string,  // Identifiant du post d'origine
      public content: string,  // Contenu de la réponse
      public createdDate: Date  // Date de création de la réponse
    ) {}
  }