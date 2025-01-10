import { Mail, Message, Notification } from '..//models/interaction.model.js'; 

// ---------------------------- CONTROLLERS - MAIL -----------------------------

// Créer un mail
const createMail = async (req, res) => {
  try {
    const { senderId, receiverId, content, subject } = req.body;

    if (!senderId || !receiverId || !content || !subject) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const newMail = new Mail({ senderId, receiverId, content, subject });

    const savedMail = await newMail.save();

    res.status(201).json({
      message: 'Mail créé avec succès.',
      mail: savedMail,
    });
  } catch (error) {
    console.error('Erreur lors de la création du mail:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer tous les mails
const getMails = async (req, res) => {
  try {
    const mails = await Mail.find();
    res.status(200).json(mails);
  } catch (error) {
    console.error('Erreur lors de la récupération des mails:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer un mail par ID
const getMailById = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);

    if (!mail) {
      return res.status(404).json({ message: 'Mail non trouvé.' });
    }

    res.status(200).json(mail);
  } catch (error) {
    console.error('Erreur lors de la récupération du mail:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour un mail par ID
const updateMail = async (req, res) => {
  try {
    const { senderId, receiverId, content, subject } = req.body;

    const updatedMail = await Mail.findByIdAndUpdate(
      req.params.id,
      { senderId, receiverId, content, subject, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedMail) {
      return res.status(404).json({ message: 'Mail non trouvé.' });
    }

    res.status(200).json(updatedMail);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mail:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un mail par ID
const deleteMail = async (req, res) => {
  try {
    const deletedMail = await Mail.findByIdAndDelete(req.params.id);

    if (!deletedMail) {
      return res.status(404).json({ message: 'Mail non trouvé.' });
    }

    res.status(200).json({ message: 'Mail supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du mail:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// ---------------------------- CONTROLLERS - MESSAGE -----------------------------

// Créer un message
const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const newMessage = new Message({ senderId, receiverId, content });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      message: 'Message créé avec succès.',
      message: savedMessage,
    });
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer tous les messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer un message par ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé.' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error('Erreur lors de la récupération du message:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour un message par ID
const updateMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { senderId, receiverId, content, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message non trouvé.' });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer un message par ID
const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message non trouvé.' });
    }

    res.status(200).json({ message: 'Message supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// ---------------------------- CONTROLLERS - NOTIFICATION -----------------------------

// Créer une notification
const createNotification = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const newNotification = new Notification({ userId, content });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      message: 'Notification créée avec succès.',
      notification: savedNotification,
    });
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer toutes les notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Récupérer une notification par ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée.' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error('Erreur lors de la récupération de la notification:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Mettre à jour une notification par ID
const updateNotification = async (req, res) => {
  try {
    const { content, isRead } = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { content, isRead, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification non trouvée.' });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la notification:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

// Supprimer une notification par ID
const deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification non trouvée.' });
    }

    res.status(200).json({ message: 'Notification supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la notification:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

//Exporter les fonctions du contrôleur
export {
    createMail,
    getMails,
    getMailById,
    updateMail,
    deleteMail,
    createMessage,
    getMessages,
    getMessageById,
    updateMessage,
    deleteMessage,
    createNotification,
    getNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
};