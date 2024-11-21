export class GroupPermission {
    groupId: string; // Référence au groupe
    permissionId: string; // Référence à la permission
  
    constructor(groupId: string, permissionId: string) {
      this.groupId = groupId;
      this.permissionId = permissionId;
    }
  }
  