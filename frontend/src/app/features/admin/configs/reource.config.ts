import { FieldType, Resource } from "../models/resource.model";

export const ressources: { [resourceType: string]: { resource: Resource } } = {
  users: {
      resource: {
          model: 'User',
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
                  ],
                  listProperties: [
                      { 
                          label: 'Identifiant', 
                          name: '_id',
                          type: FieldType.TEXT, 
                          disabled: true 
                      },
                      { 
                          label: 'Nom d\'utilisateur', 
                          name: 'username', 
                          type: FieldType.TEXT, 
                          required: true, minLength: 5, 
                          tooltip: 'Nom d\'utilisateur unique', 
                          errorMessage: 'Le nom d\'utilisateur est requis.' 
                      },
                      { 
                          label: 'Email',
                          name: 'email', 
                          type: FieldType.EMAIL, 
                          required: true, 
                          tooltip: 'Adresse email valide', 
                          errorMessage: 'L\'email est requis et doit être valide.' 
                      },
                      { 
                          label: 'Mot da passe',
                          name: 'password', 
                          type: FieldType.PASSWORD, 
                          required: true, 
                          minLength: 8, 
                          maxLength: 20, 
                          tooltip: 'Mot de passe sécurisé', 
                          errorMessage: 'Le mot de passe doit comporter entre 8 et 20 caractères.', 
                          disabled: true,
                      },
                      { 
                          label: 'Prenom',
                          name: 'first_name', 
                          type: FieldType.TEXT 
                      },
                      { 
                          label: 'Nom de famille',
                          name: 'last_name', 
                          type: FieldType.TEXT 
                      },
                      { 
                          label: 'Telephone',
                          name: 'phone', 
                          type: FieldType.TEL 
                      },
                      { 
                          label: 'Date d\'inscription',
                          name: 'created_at', 
                          type: FieldType.DATE 
                      },
                      { 
                          label: 'Date de mise a jour',
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
                          label: 'Nom d\'utilisateur', 
                          name: 'username',
                          type: FieldType.TEXT, 
                          required: true, 
                          minLength: 5, 
                          tooltip: 'Nom d\'utilisateur unique', 
                          errorMessage: 'Le nom d\'utilisateur est requis et doit comporter au moins 5 caractères.'
                      },
                      { 
                          label: 'Email', 
                          name: 'email',
                          type: FieldType.EMAIL, 
                          required: true, 
                          tooltip: 'Adresse email valide', 
                          errorMessage: 'L\'email est requis et doit être valide.'
                      },
                      { 
                          label: 'Mot de passe', 
                          name: 'password',
                          type: FieldType.PASSWORD, 
                          required: true, 
                          minLength: 8, 
                          maxLength: 20, 
                          tooltip: 'Mot de passe sécurisé', 
                          errorMessage: 'Le mot de passe doit comporter entre 8 et 20 caractères.'
                      },
                      { 
                          label: 'Confirmer le mot de passe', 
                          name: 'confirm_password',
                          type: FieldType.PASSWORD, 
                          required: true, 
                          minLength: 8, 
                          maxLength: 20, 
                          tooltip: 'Mot de passe sécurisé', 
                          errorMessage: 'Ce mot de passe ne correspond au mot passe saisi ci-dessus'
                      },
                      { 
                          label: 'Prénom',
                          name: 'first_name', 
                          type: FieldType.TEXT 
                      },
                      { 
                          label: 'Nom de famille',
                          name: 'last_name', 
                          type: FieldType.TEXT 
                      },
                      {
                          label: 'Telephone',
                          name: 'phone',
                          type: FieldType.TEL,
                          required: true, 
                          pattern: '^\\+?[1-9][0-9]{1,14}$',
                          tooltip: 'Numéro de téléphone valide',
                          errorMessage: 'Le numéro de téléphone doit être valide et respecter le format international.'
                        },
                        
                  ],
              },
          },
      },
},



};
