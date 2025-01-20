const ResourceSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true 
    },  // Titre de la ressource
    description: { 
      type: String, 
      required: true 
    },  // Description de la ressource
    type: { 
      type: String, 
      enum: ['OFFER', 'USER', 'APPLICATION', 'REPORT'], 
      required: true 
    },  // Type de ressource (offre, utilisateur, candidature, rapport)
    status: { 
      type: String, 
      enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'COMPLETED'], 
      default: 'ACTIVE' 
    },  // Statut de la ressource
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },  // Référence à l'utilisateur qui a créé la ressource
    createdAt: { 
      type: Date, 
      default: Date.now 
    },  // Date de création de la ressource
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },  // Date de la dernière mise à jour
    metadata: { 
      type: mongoose.Schema.Types.Mixed, 
      default: {} 
    },  // Métadonnées supplémentaires (optionnel)
  });