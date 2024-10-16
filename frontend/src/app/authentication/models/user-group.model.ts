export class UserGroup {
    id: number;  // Identifiant unique de l'association
    userId: number;  // Référence vers l'utilisateur
    groupId: number;  // Référence vers le groupe
  
    constructor(id: number, userId: number, groupId: number) {
      this.id = id;
      this.userId = userId;
      this.groupId = groupId;
    }
  }
  