import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import UserPanel from "../pages/UserPanel";
import UserAccount from "../pages/UserAccount";
import UserWishList from "../pages/UserWishList";
import UserOrder from "../pages/UserOrder";
import VerifyOtp from "../pages/verifyOtp";
import ResetPassword from "../pages/ResetPassword";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Order from "../pages/Order";
import CheckoutPage from "../pages/CheckoutPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Orders from "../pages/Order";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path : "verify-otp",
        element : <VerifyOtp />
      },
      {
        path : "reset-password",
        element: <ResetPassword/>
      },
      {
        path: "category-product",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetail/>
      },
      
      {
        path:"search",
        element : <SearchProduct/>
      },
      {
        path:"success",
        element:<Success/>
      },
      {
        path: "cancel",
        element : <Cancel/>
      },
      
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "all-products", element: <Products /> },
          
          { path: "settings", element: <Home /> },
          { path: "analytics", element: <Home /> },
        ],
      },
      {
        path: "user-panel",
        element: <UserPanel />,
        children: [
          {
            path: "my-account",
            element: <UserAccount />,
          },
          {
            path: "wishlist",
            element: <UserWishList />,
          },
          {
            path: "my-orders",
            element: <UserOrder />,
          },
          {
            path: "order",
            element: <Orders />,
          },
          {
            path: "cart",
            element: <Cart/>
          },
        ],
      },
    ],
  },
]);

export default router;
