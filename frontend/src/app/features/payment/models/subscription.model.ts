export class Subscription {
    _id: string;
    userId: string;
    type: 'Freemium' | 'Premium';
    startDate: Date;
    endDate: Date;
    status: 'active' | 'expired' | 'canceled';
    recurring: boolean;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      userId: string,
      type: 'Freemium' | 'Premium',
      startDate: Date,
      endDate: Date,
      status: 'active' | 'expired' | 'canceled' = 'active',
      recurring: boolean = true,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.userId = userId;
      this.type = type;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
      this.recurring = recurring;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  