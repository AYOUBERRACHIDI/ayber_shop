const productModel = require("../../model/productModel");

const UploadProductController = async (req, res) => {
  try {
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    
    res.status(200).json({
      data: saveProduct,
      error: false,
      success: true,
      message: "Product uploaded successfully.!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Nouvelle fonction pour supprimer un produit
const DeleteProductController = async (req, res) => {
  try {
    const productId = req.params.id; // Récupérer l'ID du produit depuis les paramètres de l'URL

    // Supprimer le produit à partir de l'ID
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    // Vérifier si le produit existe avant de le supprimer
    if (!deletedProduct) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = { UploadProductController, DeleteProductController };
