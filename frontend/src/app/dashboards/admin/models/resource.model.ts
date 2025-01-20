
export interface ResourceCategory { 
  label: string;
  icon: string;
}

export enum FieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  TEL = 'tel',
  IMAGE = 'image',
  DATE = 'date',
  EMAIL = 'email',
  NUMBER = 'number',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  PASSWORD = 'password',
  FILE = 'file',
  DATE_RANGE = 'date-range',  // Plage de dates
  TIME = 'time',              // Heure
  COLOR = 'color',            // Sélecteur de couleur
  URL = 'url',                // URL
  DURATION = 'duration',      // Durée
  RADIO_GROUP = 'radio-group' // Groupe de boutons radio
}


export type SelectOption = { 
  value: string | number; 
  label: string; disabled?: boolean 
};

export interface Property {
  label: string; // Libellé du champ
  name: string;
  type: FieldType; // Type du champ
  required?: boolean; // Champ requis ?
  minLength?: number; // Longueur minimale
  maxLength?: number; // Longueur maximale
  options?: SelectOption[] | (() => Promise<SelectOption[]>); // Options dynamiques
  placeholder?: string; // Placeholder
  tooltip?: string; // Info-bulle
  pattern?: string; // Pattern pour validation
  custom?: Record<string, any>; // Métadonnées personnalisées
  disabled?: boolean; // Option supplémentaire pour gérer l'état 'disabled'
  readonly?: boolean; // Champ en lecture seule
  errorMessage?: string; // Message d'erreur personnalisé
  validation?: (value: any) => string | null; // Validation personnalisée
}


export interface Properties {
  listProperties: Property[];    // Propriétés complètes, toutes les informations disponibles sur l'objet
  showProperties: Property[];    // Propriétés visibles à l'utilisateur, par exemple dans une vue simplifiée
  filterProperties: Property[];  // Propriétés utilisées pour les filtres ou les critères de recherche
  editProperties: Property[];    // Propriétés qui peuvent être modifiées ou créées
}

export interface Resource {
  model: string; // Nom de la ressource
  options: {
      parent: ResourceCategory; // Catégorie de la ressource (menu, catégorie, etc.)
      properties: Properties; // Propriétés d'une ressource
  };
}

