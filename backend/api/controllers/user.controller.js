import {User,UserGroup, Group} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 


// -------------------------------- MODEL USER CONTROLLERS --------------------------------
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


export {
    getUsers, getUsersPaginated, getUserById, getUserNameById, getUserByUsername, updateUser, deleteUser, 
    getUserGroups, getUserGroupById, createUserGroup, deleteUserGroup, 
    getGroups, getGroupById, createGroup, updateGroup, deleteGroup
};