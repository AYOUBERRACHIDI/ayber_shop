const verifyAdminRole = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next(); // Si l'utilisateur est admin, passer à la prochaine middleware
  }
  return res.status(403).json({ message: "Accès refusé. Vous devez être un administrateur." });
};

// Utilisation dans les routes nécessitant un rôle d'admin
router.get("/all-users", authToken, verifyAdminRole, allUsers);
router.put("/update-role/:id", authToken, verifyAdminRole, UpdateuserRole);
