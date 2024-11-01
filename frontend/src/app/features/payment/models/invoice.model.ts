export class Invoice {
    _id: string;
    transactionId: string;
    status: 'paid' | 'unpaid' | 'overdue';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      transactionId: string,  
      status: 'paid' | 'unpaid' | 'overdue' = 'unpaid',
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.transactionId = transactionId;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  