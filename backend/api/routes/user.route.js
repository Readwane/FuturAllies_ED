import express from 'express';

// Importer les contrôleurs spécifiques
import {
    // User Controllers
    register, 
    getUsers, 
    getUsersPaginated, 
    getUserById, 
    getUserNameById, 
    getUserByUsername, 
    updateUser, 
    deleteUser, 

    // UserGroup Controllers
    getUserGroups, 
    getUserGroupsByUserId,
    getUserGroupById, 
    createUserGroup, 
    deleteUserGroup, 

    // Group Controllers
    getGroups, 
    getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup,

    // Permission Controllers
    getPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission,

    // GroupPermission Controllers
    getGroupPermissions,
    getGroupPermissionById,
    createGroupPermission,
    updateGroupPermission,
    deleteGroupPermission,

    // UserPermission Controllers
    getUserPermissions,
    getUserPermissionById,
    createUserPermission,
    updateUserPermission,
    deleteUserPermission,

    getSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
} from '../controllers/user.controller.js';

const usersRoutes = express.Router();

// User routes
usersRoutes.post('/register', register); // Register
usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:id', getUserById);
usersRoutes.put('/users/:id', updateUser);
usersRoutes.delete('/users/:id', deleteUser);
usersRoutes.get('/users/:id/username', getUserNameById);
usersRoutes.get('/users/:username', getUserByUsername);

// UserGroup routes
usersRoutes.get('/users-groups', getUserGroups);
usersRoutes.get('/users-groups/:id', getUserGroupById);
usersRoutes.get('/users-groups/user/:id', getUserGroupsByUserId);
usersRoutes.post('/users-groups', createUserGroup);
usersRoutes.delete('/users-groups/id', deleteUserGroup);

// Group routes
usersRoutes.get('/groups', getGroups);  
usersRoutes.get('/groups/:id', getGroupById);
usersRoutes.post('/groups', createGroup);
usersRoutes.put('/groups/:id', updateGroup);
usersRoutes.delete('/groups/:id', deleteGroup);

// Permission routes
usersRoutes.get('/permissions', getPermissions);
usersRoutes.get('/permissions/:id', getPermissionById);
usersRoutes.post('/permissions', createPermission);
usersRoutes.put('/permissions/:id', updatePermission);
usersRoutes.delete('/permissions/:id', deletePermission);

// GroupPermission routes
usersRoutes.get('/group-permissions', getGroupPermissions);
usersRoutes.get('/group-permissions/:id', getGroupPermissionById);
usersRoutes.post('/group-permissions', createGroupPermission);
usersRoutes.put('/group-permissions/:id', updateGroupPermission);
usersRoutes.delete('/group-permissions/:id', deleteGroupPermission);

// UserPermission routes
usersRoutes.get('/user-permissions', getUserPermissions);
usersRoutes.get('/user-permissions/:id', getUserPermissionById);
usersRoutes.post('/user-permissions', createUserPermission);
usersRoutes.put('/user-permissions/:id', updateUserPermission);
usersRoutes.delete('/user-permissions/:id', deleteUserPermission);

// Subscription routes
usersRoutes.get('/subscriptions', getSubscriptions);
usersRoutes.get('/subscriptions/:id', getSubscriptionById);
usersRoutes.post('/subscriptions', createSubscription);
usersRoutes.put('/subscriptions/:id', updateSubscription);
usersRoutes.delete('/subscriptions/:id', deleteSubscription);


export default usersRoutes;