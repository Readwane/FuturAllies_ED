export class User {  
  _id: string;                // Identifiant unique de l'utilisateur  
  username: string;           // Nom d'utilisateur unique  
  password: string;           // Mot de passe de l'utilisateur  
  email: string;              // Adresse e-mail de l'utilisateur  
  first_name: string;         // Prénom de l'utilisateur  
  last_name: string;          // Nom de famille de l'utilisateur  
  phone: string;              // Numéro de téléphone de l'utilisateur  
  created_at: Date;           // Date de création de l'utilisateur  
  updated_at: Date;           // Date de la dernière mise à jour de l'utilisateur  

  constructor(  
      _id: string,  
      username: string,  
      password: string,  
      email: string,  
      first_name: string,  
      last_name: string,  
      phone: string,  
      created_at: Date = new Date(),  
      updated_at: Date = new Date()  
  ) {  
      this._id = _id;  
      this.username = username;  
      this.password = password;  
      this.email = email;  
      this.first_name = first_name;  
      this.last_name = last_name;  
      this.phone = phone;  
      this.created_at = created_at;  
      this.updated_at = updated_at;  
  }  
}