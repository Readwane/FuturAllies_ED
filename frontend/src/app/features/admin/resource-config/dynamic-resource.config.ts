
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
    name: string;
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
            label: string; 
            icon?: string; 
            callback: (item: any) => void; 
        }>; 
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
                            label: 'Nom d\'utilisateur', 
                            name: 'username',
                            type: FieldType.TEXT, 
                            required: true, 
                            minLength: 5, 
                            placeholder: 'Enter username', 
                            tooltip: 'Nom d\'utilisateur unique',
                            errorMessage: 'Le nom d\'utilisateur est requis et doit avoir au moins 5 caractères.'
                        },
                        { 
                            label: 'Email', 
                            name: 'email',
                            type: FieldType.EMAIL, 
                            required: true, 
                            placeholder: 'Enter email', 
                            tooltip: 'Adresse email valide',
                            errorMessage: 'L\'email est requis et doit être valide.'
                        },
                        { 
                            label: 'Prénom', 
                            name: 'first_name',
                            type: FieldType.TEXT, 
                            placeholder: 'Enter first name', 
                            tooltip: 'Prénom' 
                        },
                        { 
                            label: 'Nom', 
                            name: 'last_name',
                            type: FieldType.TEXT, 
                            placeholder: 'Enter last name', 
                            tooltip: 'Nom de famille' 
                        },
                        { 
                            label: 'Telephone', 
                            name: 'phone',
                            type: FieldType.TEL, 
                            pattern: '^\\+?[1-9][0-9]{1,14}$', 
                            tooltip: 'Numéro de téléphone valide',
                            errorMessage: 'Le numéro de téléphone doit être valide et respecter le format international.'
                        },
                        { 
                            label: 'Date d\inscription', 
                            name: 'created_at',
                            type: FieldType.DATE, 
                            disabled: true, 
                            tooltip: 'Date de création' 
                        },
                    ],
                    listProperties: [
                        { 
                            label: '_id', 
                            name: 'username',
                            type: FieldType.TEXT, 
                            disabled: true 
                        },
                        { 
                            label: 'username', 
                            name: 'username', 
                            type: FieldType.TEXT, 
                            required: true, minLength: 5, 
                            tooltip: 'Nom d\'utilisateur unique', 
                            errorMessage: 'Le nom d\'utilisateur est requis.' 
                        },
                        { 
                            label: 'username',
                            name: 'email', 
                            type: FieldType.EMAIL, 
                            required: true, 
                            tooltip: 'Adresse email valide', 
                            errorMessage: 'L\'email est requis et doit être valide.' 
                        },
                        { 
                            label: 'username',
                            name: 'password', 
                            type: FieldType.PASSWORD, 
                            required: true, 
                            minLength: 8, 
                            maxLength: 20, 
                            tooltip: 'Mot de passe sécurisé', 
                            errorMessage: 'Le mot de passe doit comporter entre 8 et 20 caractères.' 
                        },
                        { 
                            label: 'username',
                            name: 'first_name', 
                            type: FieldType.TEXT 
                        },
                        { 
                            label: 'username',
                            name: 'last_name', 
                            type: FieldType.TEXT 
                        },
                        { 
                            label: 'username',
                            name: 'phone', 
                            type: FieldType.TEL 
                        },
                        { 
                            label: 'username',
                            name: 'created_at', 
                            type: FieldType.DATE 
                        },
                        { 
                            label: 'username',
                            name: 'updated_at', 
                            type: FieldType.DATE 
                        },
                    ],
                    filterProperties: [
                        { 
                            label: 'username',
                            name: 'username', 
                            type: FieldType.TEXT 
                        },
                        { 
                            label: 'username',
                            name: 'email', 
                            type: FieldType.EMAIL 
                        },
                        { 
                            label: 'username',
                            name: 'created_at', 
                            type: FieldType.DATE 
                        },
                    ],
                    editProperties: [
                        { 
                            label: 'username', 
                            name: 'username',
                            type: FieldType.TEXT, 
                            required: true, 
                            minLength: 5, 
                            tooltip: 'Nom d\'utilisateur unique', 
                            errorMessage: 'Le nom d\'utilisateur est requis et doit comporter au moins 5 caractères.'
                        },
                        { 
                            label: 'email', 
                            name: 'username',
                            type: FieldType.EMAIL, 
                            required: true, 
                            tooltip: 'Adresse email valide', 
                            errorMessage: 'L\'email est requis et doit être valide.'
                        },
                        { 
                            label: 'password', 
                            name: 'username',
                            type: FieldType.PASSWORD, 
                            required: true, 
                            minLength: 8, 
                            maxLength: 20, 
                            tooltip: 'Mot de passe sécurisé', 
                            errorMessage: 'Le mot de passe doit comporter entre 8 et 20 caractères.'
                        },
                        { 
                            label: 'username',
                            name: 'first_name', 
                            type: FieldType.TEXT 
                        },
                        { 
                            label: 'username',
                            name: 'last_name', 
                            type: FieldType.TEXT 
                        },
                        { 
                            label: 'username',
                            name: 'phone', 
                            type: FieldType.TEL 
                        },
                    ],
                },
                pageSizeOptions: [5, 10, 20, 50],
                actions: [
                    { 
                        name: 'Edit', 
                        label: 'Modifier',
                        icon: 'edit', 
                        callback: (item) => console.log('Editing', item),
                    },
                    { 
                        name: 'Delete',
                        label: 'Supprimer', 
                        icon: 'delete', 
                        callback: (item) => console.log('Deleting', item),
                    },
                ],
            },
        },
},

// Ajout d'autres ressources

};
