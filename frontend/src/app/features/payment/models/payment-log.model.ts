export class PaymentLog {
    _id: string;
    transactionId: string;
    message: string;
    logType: 'info' | 'error';
    createdAt: Date;
  
    constructor(
      _id: string,
      transactionId: string,
      message: string,
      logType: 'info' | 'error',
      createdAt: Date = new Date()
    ) {
      this._id = _id;
      this.transactionId = transactionId;
      this.message = message;
      this.logType = logType;
      this.createdAt = createdAt;
    }
  }
  