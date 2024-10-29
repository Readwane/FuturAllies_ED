export class Invoice {
    _id: string;
    userId: string;
    transactionId: string;
    subscriptionId?: string;
    amount: number;
    issueDate: Date;
    dueDate: Date;
    status: 'paid' | 'unpaid' | 'overdue';
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      userId: string,
      transactionId: string,
      amount: number,
      issueDate: Date,
      dueDate: Date,
      status: 'paid' | 'unpaid' | 'overdue' = 'unpaid',
      subscriptionId?: string,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.userId = userId;
      this.transactionId = transactionId;
      this.subscriptionId = subscriptionId;
      this.amount = amount;
      this.issueDate = issueDate;
      this.dueDate = dueDate;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  