import {User,UserGroup, Group, Permission, GroupPermission, UserPermission} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

// -------------------------------- MODEL USER CONTROLLERS --------------------------------

const register = async (req, res) => {
  const { username, password, email, firstName, lastName, phone, accesType, biographie, address, birthDate, image, createdAt, updatedAt } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      phone,
      accesType,
      biographie,
      address,
      birthDate,
      image,
      createdAt: createdAt || Date.now(),
      updatedAt: updatedAt || Date.now(),
    });

    const savedUser = await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: savedUser });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};


const getUsers = async (req, res) => {
  try {
        console.log("Tentative de récupération de tous les utilisateurs.");
        const users = await User.find();
        console.log("Utilisateurs récupérés avec succès:", users);
        res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: error.message });
  }
};


const getUsersPaginated = async (req, res) => {
  try {
        const page = parseInt(req.query.page, 10) || 1; 
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        console.log(`Récupération des utilisateurs - Page : ${page}, Taille : ${pageSize}`);
        const skip = (page - 1) * pageSize;
        const users = await User.find().skip(skip).limit(pageSize);
        const totalItems = await User.countDocuments();
        console.log("Utilisateurs récupérés :", users);
        console.log("Nombre total d'utilisateurs :", totalItems);
        res.status(200).json({
        data: users,
        totalItems,
        });
    } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    console.log(`Tentative de récupération de l'utilisateur avec l'ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);
    if (!user) {
      console.warn("Utilisateur non trouvé avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log("Utilisateur récupéré:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.status(500).json({ message: error.message });
  }
};


const getUserNameById = async (req, res) => {
  try {
        console.log(`Tentative de récupération du nom de l'utilisateur avec l'ID: ${req.params.id}`);
        const user = await User.findById(req.params.id, 'first_name last_name'); // Sélectionne uniquement les champs nécessaires
        if (!user) {
        console.warn("Utilisateur non trouvé avec l'ID:", req.params.id);
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const fullName = `${user.firstName} ${user.lastName}`;
        console.log("Nom de l'utilisateur récupéré:", fullName);
        res.status(200).json({ name: fullName });
    } catch (error) {
    console.error("Erreur lors de la récupération du nom de l'utilisateur:", error);
    res.status(500).json({ message: error.message });
  }
};


const getUserByUsername = async (req, res) => {
  try {
        console.log(`Tentative de récupération de l'utilisateur avec le Username: ${req.params.username}`);
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
        console.warn("Utilisateur non trouvé avec le username:", req.params.username);
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur par son nom:", error);
    res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
    try {
      const { 
        username, 
        email, 
        firstName, 
        lastName, 
        phone, 
        password, 
        accesType, 
        biographie, 
        address, 
        birthDate, 
        image 
      } = req.body;
  
      const updatedData = {};
        if (username) updatedData.username = username;
        if (email) updatedData.email = email;
        if (firstName) updatedData.firstName = firstName;
        if (lastName) updatedData.lastName = lastName;
        if (phone) updatedData.phone = phone;
        if (accesType) updatedData.accesType = accesType;  
        if (biographie) updatedData.biographie = biographie;  
        if (address) updatedData.address = address;  
        if (birthDate) updatedData.birthDate = birthDate;  
        if (image) updatedData.image = image; 
        if (password) {
        if (password.trim() === "") {
          return res.status(400).json({ message: "Le mot de passe ne peut pas être vide." });
        }
        updatedData.password = await bcrypt.hash(password, 10);
      }
        updatedData.updatedAt = Date.now();
        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
        res.status(200).json(user);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
  
  
const deleteUser = async (req, res) => {
  try {
    console.log(`Tentative de suppression de l'utilisateur avec l'ID: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.warn("Utilisateur non trouvé pour suppression avec l'ID:", req.params.id);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    console.log("Utilisateur supprimé avec succès:", user);
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------- MODEL USER-GROUP CONTROLLERS --------------------------------

const getUserGroups = async (req, res) => {
  try {
    const userGroups = await UserGroup.find().populate(['user_id', 'group_id']);
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserGroupsByUserId = async (req, res) => {
  const { userId } = req.params; // L'ID de l'utilisateur est passé dans l'URL
  try {
    // Vérification que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    // Récupérer tous les UserGroup associés à cet utilisateur
    const userGroupIds = await UserGroup.find({ userId })
      .populate('groupId') // Populate pour obtenir les détails du groupe
      .exec();
    
    // Si l'utilisateur n'a pas de groupe
    if (userGroupIds.length === 0) {
      return res.status(404).json({ message: 'Cet utilisateur ne fait partie d\'aucun groupe' });
    }

    // Récupérer les noms des groupes
    const userGroups = userGroupIds.map(userGroup => userGroup.groupId.name); // Accéder au nom du groupe

    // Retourner les groupes sous forme de réponse
    res.status(200).json({ userGroups });

  } catch (error) {
    console.error("Erreur lors de la récupération des groupes de l'utilisateur:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};




const getUserGroupById = async (req, res) => {
  try {
    const userGroup = await UserGroup.findById(req.params.id).populate(['user_id', 'group_id']);
    if (!userGroup) return res.status(404).json({ message: 'Association non trouvée' });
    res.status(200).json(userGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createUserGroup = async (req, res) => {
  const { user_id, group_id } = req.body;
  const userGroup = new UserGroup({ user_id, group_id });

  try {
    const savedUserGroup = await userGroup.save();
    res.status(201).json(savedUserGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.findByIdAndDelete(req.params.id);
    if (!userGroup) return res.status(404).json({ message: 'Association non trouvée' });
    res.status(200).json({ message: 'Association supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// -------------------------------- MODEL GROUP CONTROLLERS --------------------------------
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createGroup = async (req, res) => {
  const { name, description } = req.body;
  const group = new Group({ name, description });

  try {
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateGroup = async (req, res) => {
  const { name, description } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      { name, description, created_at: Date.now() },
      { new: true }
    );

    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json({ message: 'Groupe supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------- MODEL PERMISSION CONTROLLERS --------------------------------

// Récupérer toutes les permissions
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une permission par son ID
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) return res.status(404).json({ message: 'Permission non trouvée' });
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle permission
const createPermission = async (req, res) => {
  const { name, description } = req.body;
  const permission = new Permission({ name, description });

  try {
    const savedPermission = await permission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une permission
const updatePermission = async (req, res) => {
  const { name, description } = req.body;

  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, description, updatedAt: Date.now() },
      { new: true }
    );

    if (!permission) return res.status(404).json({ message: 'Permission non trouvée' });
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une permission
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) return res.status(404).json({ message: 'Permission non trouvée' });
    res.status(200).json({ message: 'Permission supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------------------- MODEL GROUP PERMISSION CONTROLLERS --------------------------------

// Récupérer toutes les associations groupe-permission
const getGroupPermissions = async (req, res) => {
  try {
    const groupPermissions = await GroupPermission.find().populate('groupId permissionId');
    res.status(200).json(groupPermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une association groupe-permission par son ID
const getGroupPermissionById = async (req, res) => {
  try {
    const groupPermission = await GroupPermission.findById(req.params.id).populate('groupId permissionId');
    if (!groupPermission) return res.status(404).json({ message: 'Association groupe-permission non trouvée' });
    res.status(200).json(groupPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle association groupe-permission
const createGroupPermission = async (req, res) => {
  const { groupId, permissionId } = req.body;
  const groupPermission = new GroupPermission({ groupId, permissionId });

  try {
    const savedGroupPermission = await groupPermission.save();
    res.status(201).json(savedGroupPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une association groupe-permission
const updateGroupPermission = async (req, res) => {
  const { groupId, permissionId } = req.body;

  try {
    const groupPermission = await GroupPermission.findByIdAndUpdate(
      req.params.id,
      { groupId, permissionId, updatedAt: Date.now() },
      { new: true }
    );

    if (!groupPermission) return res.status(404).json({ message: 'Association groupe-permission non trouvée' });
    res.status(200).json(groupPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une association groupe-permission
const deleteGroupPermission = async (req, res) => {
  try {
    const groupPermission = await GroupPermission.findByIdAndDelete(req.params.id);
    if (!groupPermission) return res.status(404).json({ message: 'Association groupe-permission non trouvée' });
    res.status(200).json({ message: 'Association groupe-permission supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// -------------------------------- MODEL USER PERMISSION CONTROLLERS --------------------------------

// Récupérer toutes les associations utilisateur-permission
const getUserPermissions = async (req, res) => {
  try {
    const userPermissions = await UserPermission.find().populate('userId permissionId');
    res.status(200).json(userPermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une association utilisateur-permission par son ID
const getUserPermissionById = async (req, res) => {
  try {
    const userPermission = await UserPermission.findById(req.params.id).populate('userId permissionId');
    if (!userPermission) return res.status(404).json({ message: 'Association utilisateur-permission non trouvée' });
    res.status(200).json(userPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle association utilisateur-permission
const createUserPermission = async (req, res) => {
  const { userId, permissionId } = req.body;
  const userPermission = new UserPermission({ userId, permissionId });

  try {
    const savedUserPermission = await userPermission.save();
    res.status(201).json(savedUserPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une association utilisateur-permission
const updateUserPermission = async (req, res) => {
  const { userId, permissionId } = req.body;

  try {
    const userPermission = await UserPermission.findByIdAndUpdate(
      req.params.id,
      { userId, permissionId, updatedAt: Date.now() },
      { new: true }
    );

    if (!userPermission) return res.status(404).json({ message: 'Association utilisateur-permission non trouvée' });
    res.status(200).json(userPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une association utilisateur-permission
const deleteUserPermission = async (req, res) => {
  try {
    const userPermission = await UserPermission.findByIdAndDelete(req.params.id);
    if (!userPermission) return res.status(404).json({ message: 'Association utilisateur-permission non trouvée' });
    res.status(200).json({ message: 'Association utilisateur-permission supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//-------------------------------------------- MODEL SUBSCRIPTION CONTROLLERS --------------------------------------------
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('userId');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('userId');
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createSubscription = async (req, res) => {
  const { userId, type, startDate, endDate, status, recurring } = req.body;

  if (!userId || !type || !startDate || !endDate) {
    return res.status(400).json({ message: 'Les champs userId, type, startDate et endDate sont requis.' });
  }

  const subscription = new Subscription({
    userId,
    type,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    status,
    recurring,
  });

  try {
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateSubscription = async (req, res) => {
  const { type, startDate, endDate, status, recurring } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { type, startDate, endDate, status, recurring },
      { new: true }
    );
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) return res.status(404).json({ message: 'Abonnement non trouvé' });
    res.status(200).json({ message: 'Abonnement supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
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

  // Subscription Controllers
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};