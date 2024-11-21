
// Token : Gestion des jetons d'authentification et de sécurité, comme les jetons d'accès ou de vérification.
export class Token {
    _id: string;
    userId: string; // ID de l'utilisateur associé
    token: string; // Valeur du jeton
    type: string; // Type de jeton (ex : "access", "refresh", "verification")
    createdAt: Date; // Date de création
    expiresAt: Date; // Date d'expiration
  
    constructor(
      _id: string,
      userId: string,
      token: string,
      type: string,
      createdAt: Date = new Date(),
      expiresAt: Date
    ) {
      this._id = _id;
      this.userId = userId;
      this.token = token;
      this.type = type;
      this.createdAt = createdAt;
      this.expiresAt = expiresAt;
    }
  }
  