import { User, UserGroup, Group } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log('Login request received for username:', username); // Log the username

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log('User found in database:', user); // Log the user object

    if (!user) {
      console.log('User not found for username:', username); // Log if user is not found
      return res.status(400).json({ message: 'Nom d\'utilisateur inexistant' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', passwordMatch); // Log the password match result

    if (!passwordMatch) {
      console.log('Password is incorrect for username:', username); // Log if password is incorrect
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Create a JWT payload and sign the token
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });
    console.log('Token generated:', token); // Log the generated token

    // Find the user again (optional, for debugging purposes)
    const foundUser = await User.findById(user._id);
    console.log('Found user after token generation:', foundUser); // Log the found user

    if (!foundUser) {
      console.log('User not found after token generation for ID:', user._id); // Log if user is not found
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Find user groups and populate group names
    const userGroupIds = await UserGroup.find({ userId: user._id }).populate('groupId').exec();
    console.log('User groups found:', userGroupIds); // Log the user groups

    const userGroups = userGroupIds.map(userGroup => userGroup.groupId.name);
    console.log('User group names:', userGroups); // Log the user group names

    // Send the response with the token, user, and groups
    res.status(200).json({ status: 'success', token, foundUser, userGroups });
    console.log('Login successful for username:', username); // Log successful login

  } catch (error) {
    console.error("Erreur lors de la connexion:", error); // Log any errors
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const authenticateToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Token received in authenticateToken:', token); // Debugging

  if (!token) {
    console.log('No token provided in the request'); // Debugging
    return res.status(401).json({ valid: false, message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded); // Debugging

    const user = await User.findById(decoded.id);
    console.log('User found from token:', user); // Debugging

    if (!user) {
      console.log('User not found for ID:', decoded.id); // Debugging
      return res.status(403).json({ valid: false, message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ valid: true });
  } catch (error) {
    console.error('Error verifying token:', error); // Debugging
    res.status(403).json({ valid: false, message: 'Token invalide ou expiré' });
  }
};

export { login, authenticateToken };