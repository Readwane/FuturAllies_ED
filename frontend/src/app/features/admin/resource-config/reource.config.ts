import { Resource, ResourceFieldConfig, FieldType } from "../models/resource.model";

export const resourcesConfig: { [key: string]: { resource: Resource, fields: ResourceFieldConfig[] } } = {
  user: {
    resource: {
      name: 'User',
      displayableColumns: ['username', 'email', 'first_name', 'last_name', 'phone', 'created_at', 'updated_at'],
      editableColumns: ['username', 'email', 'first_name', 'last_name', 'phone'],
      filtrableColumns: ['username', 'email', 'first_name', 'last_name'],
      sortableColumns: ['username', 'email', 'first_name', 'last_name'],
      defaultSortColumn: 'username',
      pageSizeOptions: [10, 20, 50],
    },
    fields: [
      { name: 'username', label: 'Nom d\'utilisateur', type: FieldType.TEXT, required: true, minLength: 3, maxLength: 50 },
      { name: 'email', label: 'Email', type: FieldType.EMAIL, required: true },
      { name: 'first_name', label: 'Prénom', type: FieldType.TEXT, required: true },
      { name: 'last_name', label: 'Nom de famille', type: FieldType.TEXT, required: true },
      { name: 'phone', label: 'Numéro de téléphone', type: FieldType.TEL, required: true, pattern: '^[0-9]{10}$' },
      { name: 'profilePicture', label: 'Photo de Profil', type: FieldType.IMAGE },
      { name: 'created_at', label: 'Date de création', type: FieldType.DATE },
      { name: 'updated_at', label: 'Date de mise à jour', type: FieldType.DATE },
    ],
  },
  // Ajoutez ici d'autres ressources
};
