const productModel = require("../../model/productModel");
const cloudinary = require("../../config/cloudinaryConfig");
const multer = require("multer");

const storage = multer.memoryStorage(); // Stockage temporaire en mémoire
const upload = multer({ storage: storage });

const UploadProductController = async (req, res) => {
  try {
    let imageUrl = "";

    // Vérifier s'il y a un fichier image
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "products" }, 
        async (error, result) => {
          if (error) {
            throw new Error("Erreur d'upload sur Cloudinary");
          }

          imageUrl = result.secure_url; // URL sécurisée de l'image

          // Création du produit avec l'URL de l'image
          const uploadProduct = new productModel({
            ...req.body,
            stock: req.body.stock || 0,  // Gestion du stock
            image: imageUrl, // Ajoute l'image au produit
          });

          const saveProduct = await uploadProduct.save();

          res.status(200).json({
            data: saveProduct,
            error: false,
            success: true,
            message: "Product uploaded successfully with image!",
          });
        }
      );

      result.end(req.file.buffer);
    } else {
      // Si aucune image n'est fournie, sauvegarder sans image
      const uploadProduct = new productModel({
        ...req.body,
        stock: req.body.stock || 0,  // Gestion du stock
      });

      const saveProduct = await uploadProduct.save();

      res.status(200).json({
        data: saveProduct,
        error: false,
        success: true,
        message: "Product uploaded successfully (without image)!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};



module.exports = { UploadProductController, upload };
