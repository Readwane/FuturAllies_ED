// Classe User
export class User {
    _id: string;
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    accesType: 'Freemium' | 'Premium';
    biographie?: string;
    address?: string;
    birthDate?: Date;
    image?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        username: string,
        password: string,
        email: string,
        phone: string,
        accesType: 'Freemium' | 'Premium',
        createdAt: Date,
        updatedAt: Date,
        firstName?: string,
        lastName?: string,
        biographie?: string,
        address?: string,
        birthDate?: Date,
        image?: string
    ) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.accesType = accesType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (firstName) this.firstName = firstName;
        if (lastName) this.lastName = lastName;
        if (biographie) this.biographie = biographie;
        if (address) this.address = address;
        if (birthDate) this.birthDate = birthDate;
        if (image) this.image = image;
    }
}

// Classe UserGroup
export class UserGroup {
    _id: string;
    userId: string;
    groupId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        userId: string,
        groupId: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.userId = userId;
        this.groupId = groupId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

// Classe Group
export class Group {
    _id: string;
    name: 'Student' | 'Trainer' | 'Employer' | 'Admin';
    description?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        name: 'Student' | 'Trainer' | 'Employer' | 'Admin',
        createdAt: Date,
        updatedAt: Date,
        description?: string
    ) {
        this._id = _id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (description) this.description = description;
    }
}
