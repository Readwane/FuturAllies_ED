export class PaymentMethod {
    _id: string;
    type: 'Carte Bancaire' | 'Mobile Money';
    details: any; // JSON pour les détails spécifiques
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      type: 'Carte Bancaire' | 'Mobile Money',
      details: any,
      isDefault: boolean = false,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.type = type;
      this.details = details;
      this.isDefault = isDefault;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  