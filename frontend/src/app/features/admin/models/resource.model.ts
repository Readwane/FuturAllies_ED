// Interface pour définir les éléments du menu
export interface MenuItem {
  label: string; // Libellé du menu
  icon: string; // Icône associée au menu
  route?: string; // Route optionnelle si le menu est un lien direct
  children?: MenuItemChildren[]; // Liste des sous-menus (si ce menu en a)
}

// Interface pour les enfants d'un menu (éléments de sous-menu)
export interface MenuItemChildren {
  label: string; // Libellé du sous-menu
  route: string; // Route permettant d'accéder à ce sous-menu
}


/***
 * Exemple de MenuItems et leurs enfants MenuItemChildren
 * menuItems:
 * {
 * label: 'Utilisateurs',
 * icon: 'People',
 * children: [
 *  {
*    label: 'Students',
*    route: 'users/students
*   }
*   {
*    label: 'formateurs',
*    route: 'users/trainers
*   }
* ]
* }
*/


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
}

export interface Property {
  label: string; // Libellé du champ
  type: FieldType; // Type du champ
  required?: boolean; // Champ requis ?
  minLength?: number; // Longueur minimale
  maxLength?: number; // Longueur maximale
  options?: { value: string | number; label: string; disabled?: boolean }[]; // Options pour les champs sélection
  placeholder?: string; // Placeholder
  tooltip?: string; // Info-bulle
  pattern?: string; // Pattern pour validation
  custom?: Record<string, any>; // Métadonnées personnalisées
  disabled?: boolean; // Option supplémentaire pour gérer l'état 'disabled'
  errorMessage?: string; // Message d'erreur personnalisé (en cas de validation échouée)
}


export interface Properties {
    showProperties: Property[];    // Propriétés visibles à l'utilisateur, par exemple dans une vue simplifiée
    listProperties: Property[];    // Propriétés complètes, toutes les informations disponibles sur l'objet
    filterProperties: Property[];  // Propriétés utilisées pour les filtres ou les critères de recherche
    editProperties: Property[];    // Propriétés qui peuvent être modifiées
}

export interface Resource {
    name: string; // Nom de la ressource
    options: {
        parent: ResourceCategory; // Catégorie de la ressource (menu, catégorie, etc.)
        properties: Properties; // Propriétés d'une ressource
        pageSizeOptions?: number[]; // Options de taille pour la pagination
        actions?: Array<{ 
            name: string; 
            icon?: string; 
            handler: (item: any) => void; 
            isActive: boolean 
        }>; // Actions disponibles
    };
}

export const ressources: { [key: string]: { resource: Resource } } = {
  users: {
      resource: {
          name: 'Users',
          options: {
              parent: { label: 'Utilisateurs', icon: 'People' },
              properties: {
                  showProperties: [
                      { 
                          label: 'username', 
                          type: FieldType.TEXT, 
                          required: true, 
                          minLength: 5, 
                          placeholder: 'Enter username', 
                          tooltip: 'Nom d\'utilisateur unique',
                          errorMessage: 'Le nom d\'utilisateur est requis et doit avoir au moins 5 caractères.'
                      },
                      { 
                          label: 'email', 
                          type: FieldType.EMAIL, 
                          required: true, 
                          placeholder: 'Enter email', 
                          tooltip: 'Adresse email valide',
                          errorMessage: 'L\'email est requis et doit être valide.'
                      },
                      { 
                          label: 'first_name', 
                          type: FieldType.TEXT, 
                          placeholder: 'Enter first name', 
                          tooltip: 'Prénom' 
                      },
                      { 
                          label: 'last_name', 
                          type: FieldType.TEXT, 
                          placeholder: 'Enter last name', 
                          tooltip: 'Nom de famille' 
                      },
                      { 
                          label: 'phone', 
                          type: FieldType.TEL, 
                          pattern: '^\\+?[1-9][0-9]{1,14}$', 
                          tooltip: 'Numéro de téléphone valide',
                          errorMessage: 'Le numéro de téléphone doit être valide et respecter le format international.'
                      },
                      { 
                          label: 'created_at', 
                          type: FieldType.DATE, 
                          disabled: true, 
                          tooltip: 'Date de création' 
                      },
                  ],
                  listProperties: [
                      { label: '_id', type: FieldType.TEXT, disabled: true },
                      { label: 'username', type: FieldType.TEXT, required: true, minLength: 5, tooltip: 'Nom d\'utilisateur unique', errorMessage: 'Le nom d\'utilisateur est requis.' },
                      { label: 'email', type: FieldType.EMAIL, required: true, tooltip: 'Adresse email valide', errorMessage: 'L\'email est requis et doit être valide.' },
                      { label: 'password', type: FieldType.PASSWORD, required: true, minLength: 8, maxLength: 20, tooltip: 'Mot de passe sécurisé', errorMessage: 'Le mot de passe doit comporter entre 8 et 20 caractères.' },
                      { label: 'first_name', type: FieldType.TEXT },
                      { label: 'last_name', type: FieldType.TEXT },
                      { label: 'phone', type: FieldType.TEL },
                      { label: 'created_at', type: FieldType.DATE },
                      { label: 'updated_at', type: FieldType.DATE },
                  ],
                  filterProperties: [
                      { label: 'username', type: FieldType.TEXT },
                      { label: 'email', type: FieldType.EMAIL },
                      { label: 'created_at', type: FieldType.DATE },
                  ],
                  editProperties: [
                      { 
                          label: 'username', 
                          type: FieldType.TEXT, 
                          required: true, 
                          minLength: 5, 
                          tooltip: 'Nom d\'utilisateur unique', 
                          errorMessage: 'Le nom d\'utilisateur est requis et doit comporter au moins 5 caractères.'
                      },
                      { 
                          label: 'email', 
                          type: FieldType.EMAIL, 
                          required: true, 
                          tooltip: 'Adresse email valide', 
                          errorMessage: 'L\'email est requis et doit être valide.'
                      },
                      { 
                          label: 'password', 
                          type: FieldType.PASSWORD, 
                          required: true, 
                          minLength: 8, 
                          maxLength: 20, 
                          tooltip: 'Mot de passe sécurisé', 
                          errorMessage: 'Le mot de passe doit comporter entre 8 et 20 caractères.'
                      },
                      { label: 'first_name', type: FieldType.TEXT },
                      { label: 'last_name', type: FieldType.TEXT },
                      { label: 'phone', type: FieldType.TEL },
                  ],
              },
              pageSizeOptions: [5, 10, 20, 50],
              actions: [
                  { 
                      name: 'Edit', 
                      icon: 'edit', 
                      handler: (item) => console.log('Editing', item),
                      isActive: true,
                  },
                  { 
                      name: 'Delete', 
                      icon: 'delete', 
                      handler: (item) => console.log('Deleting', item),
                      isActive: true,
                  },
              ],
          },
      },
  },

  // Ajout d'autres ressources
  
};
