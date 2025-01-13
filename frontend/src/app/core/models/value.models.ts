// value.model.ts

export class Value {
    _id: string;
    title: string;
    description: string;
    icon?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        title: string,
        description: string,
        createdAt: Date,
        updatedAt: Date,
        icon?: string
    ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (icon) this.icon = icon;
    }
}
