// mail.model.ts

export class Mail {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    subject: string;
    sentAt: Date;

    constructor(
        _id: string,
        senderId: string,
        receiverId: string,
        content: string,
        subject: string,
        sentAt: Date
    ) {
        this._id = _id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.subject = subject;
        this.sentAt = sentAt;
    }
}


// message.model.ts

export class Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    sentAt: Date;

    constructor(
        _id: string,
        senderId: string,
        receiverId: string,
        content: string,
        sentAt: Date
    ) {
        this._id = _id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.sentAt = sentAt;
    }
}


// notification.model.ts

export class Notification {
    _id: string;
    userId: string;
    content: string;
    isRead: boolean;
    createdAt: Date;

    constructor(
        _id: string,
        userId: string,
        content: string,
        isRead: boolean,
        createdAt: Date
    ) {
        this._id = _id;
        this.userId = userId;
        this.content = content;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
}
