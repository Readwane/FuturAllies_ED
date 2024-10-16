
  export class User {
    id: number;  // Identifiant unique de l'utilisateur
    username: string;  // Nom d'utilisateur
    password: string;  // Mot de passe (hashé)
    email: string;  // Adresse e-mail
    createdAt: Date;

    constructor(
      id: number,
      username: string,
      password: string,
      email: string,
      createdAt: Date = new Date(),
    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.createdAt = createdAt;    }
  }
  
