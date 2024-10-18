
  export class User {
    _id: string;  // Identifiant unique de l'utilisateur
    username: string;  // Nom d'utilisateur
    password: string;  // Mot de passe (hashé)
    email: string;  // Adresse e-mail
    createdAt: Date;

    constructor(
      _id: string,
      username: string,
      password: string,
      email: string,
      createdAt: Date = new Date(),
    ) {
      this._id = _id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.createdAt = createdAt;    }
  }
  
