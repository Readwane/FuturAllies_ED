export class PaymentProvider {
    _id: string;
    name: string;
    apiEndpoint: string;
    credentials: any; // JSON pour les clés API
    fees: number; // Pourcentage de frais par transaction
    supportedMethods: string[]; // Liste des méthodes supportées
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      name: string,
      apiEndpoint: string,
      credentials: any,
      fees: number,
      supportedMethods: string[],
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.name = name;
      this.apiEndpoint = apiEndpoint;
      this.credentials = credentials;
      this.fees = fees;
      this.supportedMethods = supportedMethods;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  