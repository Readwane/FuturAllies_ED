// models/service.model.ts

export class Service {
    _id: string; // Id sera fourni par MongoDB
    title: string;
    description: string;
    icon_url: string; // Le chemin de l'icône à afficher

    constructor(
        _id: string, // Id sera fourni par MongoDB
        title: string,
        description: string,
        icon_url: string // Le chemin de l'icône à afficher
    ){
        this._id= _id;
        this.title = title;
        this.description = description;
        this.icon_url = icon_url;
    }
  }
  