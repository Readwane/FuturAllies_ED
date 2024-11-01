export class Transaction {
    _id: string;
    userId: string;
    paymentMethodId: string;
    providerId: string;
    issueTransaction: 'subscription' | 'one-time payment';
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    date: Date;
    description?: string;
  
    constructor(
      _id: string,
      userId: string,
      paymentMethodId: string,
      providerId: string,
      issueTransaction: 'subscription' | 'one-time payment',
      amount: number,
      currency: string,
      status: 'pending' | 'completed' | 'failed' | 'refunded',
      date: Date = new Date(),
      description?: string,
    ) {
      this._id = _id;
      this.userId = userId;
      this.paymentMethodId = paymentMethodId;
      this.providerId = providerId;
      this.issueTransaction = issueTransaction;
      this.amount = amount;
      this.currency = currency;
      this.status = status;
      this.date = date;
      this.description = description;
    }
  }
  