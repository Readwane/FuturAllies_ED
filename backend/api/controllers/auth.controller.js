import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword, 
            email: req.body.email, 
            firstName: req.body.firstName, 
            lastName:  req.body.lastName,  
            phone: req.body.phone,  
            accesType: req.body.accesType, 
            biographie: req.body.biographie, 
            address: req.body.address,
            birthDate: req.body.birthDate,
            image: req.body.image,
            createdAt: req.body.createdAt || Date.now,  
            updatedAt: req.body.updatedAt || Date.now,  
        });
        const savedUser = await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: savedUser });
    } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
        const user = await User.findOne({ username });
        if (!user) {
        return res.status(400).json({ message: 'Nom d\'utilisateur inexistant' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
        }
        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userInfo = await User.findById(user._id);
        if (!userInfo) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ token, user: userInfo });
    } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }
  try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};


export { register, login, authenticateToken };