// import { Outlet, useLocation } from "react-router-dom";
// import "./App.css";
// import Footer from "./components/Footer";
// import Header from "./components/Header";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useEffect, useState } from "react";
// import SummaryApi from "./common/API";
// import context from "./context/Context";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserDetails } from "./store/userSlice";
// import { CartProvider } from "./context/CartContext";

// //Function to scroll page to top of the page
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }



// function App() {

//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);

//   const [wishListProductCount, setWishListProductCount] = useState(0)

//   const userDetail = async () => {
//     const dataApi = await fetch(SummaryApi.userDetail.url, {
//       method: SummaryApi.userDetail.method,
//       credentials: "include",
//     });

//     const ApiResponse = await dataApi.json();

//     // console.log("User Data API Response ", dataApi)
//     if (ApiResponse.success) {
//       dispatch(setUserDetails(ApiResponse.data));
//     }
//   };

//   const fetchAddToWishListCount = async()=>{
//     const response = await fetch(SummaryApi.getwishListProductCount.url,{
//       method : SummaryApi.getwishListProductCount.method,
//       credentials : "include"
//     })

//     const dataAPI = await response.json()

//     if(dataAPI.success){
//       setWishListProductCount(dataAPI?.data?.count)
//     }

//     // console.log(data.data)
//   }

//   useEffect(() => {
//     // User Dteail
//     userDetail();
//     //WishList Count
//     fetchAddToWishListCount()
//   },[]);

//   return (
//     <>
//       <context.Provider
//         value={{
//           userDetail, //User Detail Fetch
//           wishListProductCount, //WishList Product Count
//           fetchAddToWishListCount
//         }}
//       >
//         <CartProvider userId={user?._id}>
//           <ToastContainer  position="top-center"/>
//           <Header />
          
//           <ScrollToTop />
//           <main className="min-h-[calc(100vh-70px)] pt-16">
//             <Outlet />
//           </main>
//           <Footer />
//         </CartProvider>
//       </context.Provider>
//     </>
//   );
// }

// export default App;






import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common/API";
import context from "./context/Context";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { CartProvider } from "./context/CartContext";

// Function to scroll page to top of the page
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [wishListProductCount, setWishListProductCount] = useState(0);
  const location = useLocation();

  const userDetail = async () => {
    const dataApi = await fetch(SummaryApi.userDetail.url, {
      method: SummaryApi.userDetail.method,
      credentials: "include",
    });

    const ApiResponse = await dataApi.json();

    if (ApiResponse.success) {
      dispatch(setUserDetails(ApiResponse.data));
    }
  };

  const fetchAddToWishListCount = async () => {
    const response = await fetch(SummaryApi.getwishListProductCount.url, {
      method: SummaryApi.getwishListProductCount.method,
      credentials: "include",
    });

    const dataAPI = await response.json();

    if (dataAPI.success) {
      setWishListProductCount(dataAPI?.data?.count);
    }
  };

  useEffect(() => {
    userDetail();
    fetchAddToWishListCount();
  }, []);

  // Définir les routes où le Header et le Footer ne doivent pas être affichés
  const hideHeaderFooterPaths = [
    "/admin-panel",
    "/admin-panel/all-users",
    "/admin-panel/all-products",
    "/admin-panel/settings",
    "/admin-panel/analytics",
  ];

  // Vérifier si la route actuelle est dans la liste des routes à exclure
  const isAdminPanel = hideHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      <context.Provider
        value={{
          userDetail,
          wishListProductCount,
          fetchAddToWishListCount,
        }}
      >
        <CartProvider userId={user?._id}>
          <ToastContainer position="top-center" />

          {!isAdminPanel && <Header />}

          <ScrollToTop />
          <main className={isAdminPanel ? "min-h-screen mt-0" : "min-h-[calc(100vh-70px)] pt-16"}>
            <Outlet />
          </main>

          {!isAdminPanel && <Footer />}
        </CartProvider>
      </context.Provider>
    </>
  );
}

export default App;
