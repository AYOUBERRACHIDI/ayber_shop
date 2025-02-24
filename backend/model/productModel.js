const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    required: true,
    type: String
  },
  brandName: {
    required: true,
    type: String
  },
  category: {
    required: true,
    type: String
  },
  productImage: {
    required: true,
    type: Array
  },
  productDesc: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  sellingPrice: {
    required: true,
    type: Number
  },
  stock: {  // Ajouter stock ici
    required: true,
    type: Number,
    default: 0  // Valeur par défaut de stock
  }

}, {
  timestamps: true
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;


module.exports = productModel;
