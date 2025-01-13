import { User, UserGroup, Group } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const userGroupIds = await UserGroup.find({ userId: user._id })
      .populate('groupId')
      .exec();

    // Récupérer les noms des groupes
    const userGroups = userGroupIds.map(userGroup => userGroup.groupId.name);

    res.status(200).json({ status: 'success', token, user: foundUser, userGroups });

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};



const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
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

export {login, authenticateToken };
