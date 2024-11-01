export class PaymentProviderTransaction {
    _id: string;
    transactionId: string;
    providerId: string;
    createdAt: Date;
  
    constructor(
      _id: string,
      transactionId: string,
      providerId: string,
      createdAt: Date = new Date()
    ) {
      this._id = _id;
      this.transactionId = transactionId;
      this.providerId = providerId;
      this.createdAt = createdAt;
    }
  }
  