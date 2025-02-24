const Order = require('../../model/OrderProductModel');

// Créer une commande
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    // Crée une nouvelle commande
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      status: 'pending',
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Récupérer toutes les commandes
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Récupérer une commande par ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('userId').populate('products.productId');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mettre à jour le statut d'une commande
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully!',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};