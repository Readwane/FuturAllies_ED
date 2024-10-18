export class UserGroup {
    userId: string;  // Référence vers l'utilisateur
    groupId: string;  // Référence vers le groupe
  
    constructor(
      userId: string, 
      groupId: string) 
      {
      this.userId = userId;
      this.groupId = groupId;
    }
  }
  