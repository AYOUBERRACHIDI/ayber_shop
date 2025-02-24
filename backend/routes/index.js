const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSIgnIn')
const authToken = require('../middleware/AuthToken')
const userDetailController = require('../controller/user/UserDetail')
const UserLogout = require('../controller/user/UserLogout')
const allUsers = require('../controller/user/AllUsers')
const UpdateuserRole = require('../controller/user/UpdateUserRole')
const { UploadProductController, upload } = require("../controller/product/UploadProduct");
const GetProductController = require('../controller/product/GetProduct')
const UpdateProductController = require('../controller/product/UpdateProduct')
const GetSingleCategoryProductController = require('../controller/product/GetSingleCategoryProduct')
const getCategoryWiseProductController = require('../controller/product/GetCategoryWiseProduct')
const GetSingleProductController = require('../controller/product/GetSingleProduct')
const CartController = require('../controller/user/CartController')
const CountCartProductController = require('../controller/user/CountCartProduct')
const UpdatePlusCartQuantityController = require('../controller/user/UpdatePlusCartQuantity')
const DeleteCartProductController = require('../controller/user/DeleteCartProduct')
const SearchProductController = require('../controller/product/SearchProduct')
const FilterProductController = require('../controller/product/FilterProduct')
const wishListCOntroller = require('../controller/user/AddToWishList')
const GetWishListController = require('../controller/user/GetWishList')
const CountAddToWishListProductController = require('../controller/user/CountAddToWishListProduct')
const DeleteWishlistProductController = require('../controller/user/DeleteWishlistProduct')
const Updateuser = require('../controller/user/UpdateUser')
const OtpController = require('../controller/OTP/OtpController')
const VerifyOtpController = require('../controller/OTP/VerifyOtpController')
const ResetPasswordController = require('../controller/user/ResetPasswordController')
const PaymentController = require('../controller/payment/PaymentController')
const webHooks = require('../controller/order/WebHook')
const GetOderDetails = require('../controller/order/GetOrderDetails')
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controller/order/orderController');
const ConfirmOrderController = require("../controller/order/ConfirmOrderController");


// // ----------------------------------------------------------------
// const Order = require('../model/OrderProductModel');

// router.post('/create-order', authToken, async (req, res) => {
//   const { userId, products, totalAmount } = req.body;

//   try {
//     const order = new Order({
//       userId,
//       products,
//       totalAmount,
//     });

//     await order.save();

//     res.status(201).json({ success: true, message: 'Order created successfully', order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
//   }
// });

// module.exports = router;




// router.get('/user-orders/:userId', authToken, async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const orders = await Order.find({ userId }).populate('products.productId');
//       res.status(200).json({ success: true, orders });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
//     }
//   });
// ----------------------------------------------------------------





router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken ,userDetailController)
router.get("/logout", UserLogout)

//Admin Panel
router.get("/all-users", authToken, allUsers)
router.put("/update-role/:id", authToken, UpdateuserRole)


//Product

router.post("/upload-product", upload.single("image"), UploadProductController);

router.get("/get-product", GetProductController)
router.put("/update-product",authToken, UpdateProductController)
router.get("/get-category-product", GetSingleCategoryProductController)
router.get("/get-category-wise-product/:category", getCategoryWiseProductController)
router.get("/get-single-product-details/:id",GetSingleProductController)
router.get("/search-product", SearchProductController)
router.post("/fiter-product", FilterProductController)



router.post("/confirm-order", authToken, ConfirmOrderController);

// cart
router.post("/add-to-cart",authToken,CartController)
router.get("/count-cart-product/:id",authToken,CountCartProductController)
router.post("/update-cart-quantity", authToken, UpdatePlusCartQuantityController)
router.post("/delete-cart-product", authToken, DeleteCartProductController)
router.put("/update-user",authToken,Updateuser)

// wishList
router.post("/add-to-wishlist", authToken, wishListCOntroller)
router.get("/get-wishlist", authToken, GetWishListController)
router.get("/get-wishlist-count", authToken, CountAddToWishListProductController)
router.post("/delete-wishlist-product", authToken, DeleteWishlistProductController)

// OTP
router.post("/send-otp",OtpController)
router.post("/verify-otp",VerifyOtpController)
router.post("/reset-password",ResetPasswordController)




// Créer une commande
router.post('/create-order', authToken, createOrder);

// Récupérer toutes les commandes
router.get('/get-orders', authToken, getOrders);

// Récupérer une commande par ID
router.get('/get-order/:id', authToken, getOrderById);

// Mettre à jour le statut d'une commande
router.put('/update-order-status/:id', authToken, updateOrderStatus);


//Payment & Order
// router.post("/checkout",authToken,PaymentController)
// router.post("/webhook",webHooks)  // /api/webhook
// router.get("/get-order-details", authToken, GetOderDetails)

module.exports = router