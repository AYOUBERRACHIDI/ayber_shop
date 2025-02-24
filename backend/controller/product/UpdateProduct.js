const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../model/productModel");

const UpdateProductController = async(req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!(await uploadProductPermission(sessionUserId))) {
      throw new Error("Permission denied..!");
    }
    
    const {_id, ...resBody} = req.body;
    
    // Vérification et mise à jour du stock
    if (resBody.stock !== undefined && resBody.stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

    res.status(200).json({
      data : updateProduct,
      message : "Product updated successfully..!",
      error : false,
      success : true
    });
    
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false
     });
  }
};

module.exports = UpdateProductController;
