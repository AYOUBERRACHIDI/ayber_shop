const userModel = require("../model/userModel");

const uploadProductPermission = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user || user.role !== "ADMIN") {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erreur de permission :", error);
    return false;
  }
};

module.exports = uploadProductPermission;
