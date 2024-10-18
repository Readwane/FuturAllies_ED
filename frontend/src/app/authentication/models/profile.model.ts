export class Profile {
    _id: string;  // Identifiant unique du profil
    userId: string;  // Référence vers l'utilisateur associé
    firstName: string;  // Prénom de l'utilisateur
    lastName: string;  // Nom de l'utilisateur
    type: 'Freemium' | 'Premium'
    bio: string;  // Courte biographie ou description de l'utilisateur
    phoneNumber: string;  // Numéro de téléphone
    address: string;  // Adresse de l'utilisateur
    birthDate: Date;  // Date de naissance
    profilePictureUrl: string;  // URL de la photo de profil
  
    constructor(
      _id: string,
      userId: string,
      firstName: string,
      lastName: string,
      type: 'Freemium' | 'Premium',
      bio: string,
      phoneNumber: string,
      address: string,
      birthDate: Date,
      profilePictureUrl: string
    ) {
      this._id = _id;
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.type = type;
      this.bio = bio;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.birthDate = birthDate;
      this.profilePictureUrl = profilePictureUrl;
    }
  }
  