const OrderModel = require("../../model/OrderProductModel");
const ProductModel = require("../../model/productModel");

const ConfirmOrderController = async (req, res) => {
  try {
    const { userId, products } = req.body; // Liste des produits commandés

    // Vérifier la disponibilité du stock pour chaque produit
    for (let item of products) {
      const product = await ProductModel.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuffisant pour ${product.productName}`,
          error: true,
          success: false,
        });
      }
    }

    // Décrémenter le stock après vérification
    for (let item of products) {
      await ProductModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Créer la commande
    const newOrder = new OrderModel({
      userId,
      products,
      status: "Confirmée",
    });
    await newOrder.save();

    res.status(200).json({
      message: "Commande confirmée avec succès",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = ConfirmOrderController;
