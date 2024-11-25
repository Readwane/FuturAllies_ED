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
}
  
export interface Resource {
    [x: string]: any;
    name: string;  // Nom de la ressource (ex: 'Utilisateurs')
    displayableColumns?: string[]; // Champs affichables, sinon tous les champs
    editableColumns?: string[]; // Champs éditables, sinon tous les champs
    filtrableColumns?: string[]; // Champs filtrables
    sortableColumns?: string[]; // Champs triables
    defaultSortColumn?: string; // Colonne par défaut pour le tri
    pageSizeOptions?: number[]; // Options de taille pour la pagination
}
  
export interface ResourceFieldConfig {
    name: string; // Nom du champ
    label: string; // Libellé du champ
    type: FieldType; // Type du champ
    required?: boolean; // Champ requis ?
    minLength?: number; // Longueur minimale
    maxLength?: number; // Longueur maximale
    options?: { value: string | number; label: string; disabled?: boolean }[]; // Options pour les champs sélection
    placeholder?: string; // Placeholder
    tooltip?: string; // Info-bulle
    pattern?: string; // Pattern pour validation
    custom?: any; // Métadonnées personnalisées
  }
  