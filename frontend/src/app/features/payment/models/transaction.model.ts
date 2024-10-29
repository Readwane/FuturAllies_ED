export class Transaction {
    _id: string;
    userId: string;
    paymentMethodId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    date: Date;
    description?: string;
    providerReference?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      userId: string,
      paymentMethodId: string,
      amount: number,
      currency: string,
      status: 'pending' | 'completed' | 'failed' | 'refunded',
      date: Date = new Date(),
      description?: string,
      providerReference?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.userId = userId;
      this.paymentMethodId = paymentMethodId;
      this.amount = amount;
      this.currency = currency;
      this.status = status;
      this.date = date;
      this.description = description;
      this.providerReference = providerReference;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  