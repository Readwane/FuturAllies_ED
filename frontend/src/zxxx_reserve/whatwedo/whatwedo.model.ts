// models/service.model.ts

export class Wwedo {
  _id: string; // Id sera fourni par MongoDB
  title: string;
  description: string;
  icon: string; // Le chemin de l'icône à afficher

  constructor(
      _id: string, // Id sera fourni par MongoDB
      title: string,
      description: string,
      icon: string // Le chemin de l'icône à afficher
  ){
      this._id= _id;
      this.title = title;
      this.description = description;
      this.icon = icon;
  }
}
