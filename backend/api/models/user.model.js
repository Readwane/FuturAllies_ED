import mongoose from 'mongoose';  


const UserSchema = new mongoose.Schema({  
    username: { type: String, required: true, unique: true },  // Nom d'utilisateur  
    password: { type: String, required: true },  // Mot de passe (hashé)  
    email: { type: String, required: true, unique: true },  // Adresse e-mail  
    firstName: { type: String},  // Prénom de l'utilisateur  
    lastName: { type: String},  // Nom de famille de l'utilisateur  
    phone: { type: String, required: true },  // Numéro de téléphone  
    accesType: { type: String, enum: ['Freemium', 'Premium'], default: 'Freemium'}, // Statut de la candidature
    biographie: { type: String },  // Courte biographie
    address: { type: String },  // Adresse de l'utilisateur
    birthDate: { type: Date },  // Date de naissance
    image: { type: String },  // URL de la photo de profil
    createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour  
});


const UserGroupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence vers l'utilisateur
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },  // Référence vers le groupe
    createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour  
});


const GroupSchema = new mongoose.Schema({
    name: { type: String, enum: ['Student', 'Trainer', 'Employer', 'Admin'], required: true},  // Nom du groupe
    description: { type: String },  // Description du groupe
    createdAt: { type: Date, default: Date.now },  // Date de création de l'utilisateur  
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour 
});

const PermissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  // Nom de la permission (ex: "create_user", "delete_post")
    description: { type: String },  // Description de la permission
    createdAt: { type: Date, default: Date.now },  // Date de création de la permission
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour
});

const GroupPermissionSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },  // Référence vers le groupe
    permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },  // Référence vers la permission
    createdAt: { type: Date, default: Date.now },  // Date de création de l'association
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour
});

const UserPermissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Référence vers l'utilisateur
    permissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },  // Référence vers la permission
    createdAt: { type: Date, default: Date.now },  // Date de création de l'association
    updatedAt: { type: Date, default: Date.now },   // Date de la dernière mise à jour
});

const SubscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Freemium', 'Premium'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'expired', 'canceled'], default: 'active' },
    recurring: { type: Boolean, default: true },
    createAdt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
const UserPermission = mongoose.models.UserPermission || mongoose.model('UserPermission', UserPermissionSchema);
const GroupPermission = mongoose.models.GroupPermission || mongoose.model('GroupPermission', GroupPermissionSchema);
const Permission = mongoose.models.Permission || mongoose.model('Permission', PermissionSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema); 
const UserGroup = mongoose.models.UserGroup || mongoose.model('UserGroup', UserGroupSchema);
const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);


export {Group, User, UserGroup, Permission, GroupPermission, UserPermission, Subscription};
