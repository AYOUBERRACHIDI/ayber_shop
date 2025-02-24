const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Assurez-vous que ce chemin est correct

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers['authorization'];
    
    if (!token) {
      return res.status(401).json({
        message: "Veuillez vous connecter pour continuer.",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(403).json({
          message: "Session invalide, veuillez vous reconnecter.",
          error: true,
          success: false
        });
      }

      // Récupérer l'utilisateur depuis la base de données
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(404).json({
          message: "Utilisateur non trouvé.",
          error: true,
          success: false
        });
      }

      req.userId = decoded._id;
      req.userRole = user.role; // Assurez-vous que le champ `role` existe dans votre modèle utilisateur

      next();
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur interne du serveur",
      error: true,
      success: false
    });
  }
};

module.exports = authToken;
