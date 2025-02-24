// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { FaHeart, FaBars, FaShoppingCart } from "react-icons/fa";
// import { RiFolderUploadFill } from "react-icons/ri";
// import { BsPersonCircle } from "react-icons/bs";
// import { FaCircleUser } from "react-icons/fa6";
// import { FaWindowClose } from "react-icons/fa";
// import { FaPowerOff } from "react-icons/fa";
// import SummaryApi from "../common/API";
// import { toast } from "react-toastify";
// import { setUserDetails } from "../store/userSlice";

// const UserPanel = () => {
//   const user = useSelector((state) => state?.user?.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isSidebarVisible, setSidebarVisible] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarVisible(!isSidebarVisible);
//   };

//   const handleLogout = async () => {
//     const fetchDate = await fetch(SummaryApi.userLogout.url, {
//       method: SummaryApi.userLogout.method,
//       credentials: "include",
//     });

//     const data = await fetchDate.json();

//     if (data.success) {
//       toast.success(data.message);
//       dispatch(setUserDetails(null));
//       navigate("/");
//     }

//     if (data.error) {
//       toast.error(data.message);
//     }
//   };

//   return (
//     <div className="flex sm:flex-row max-h-[calc(100vh-70px)] flex-col p-4 gap-4">
//       <div className="cursor-pointer p-2 md:hidden" onClick={toggleSidebar}>
//         <FaBars />
//       </div>
//       {/* sidebar */}
//       <aside
//         className={`bg-slate-400 min-h-[calc(100vh-160px)] w-full max-w-64 m-4 rounded-lg text-white text-center relative customShadow overflow-y-auto ${
//           isSidebarVisible ? "block" : "hidden"
//         } sm:block`}
//       >
//         <div
//           className="right-1 top-1 cursor-pointer p-1 absolute md:hidden"
//           onClick={toggleSidebar}
//         >
//           <FaWindowClose className="text-xl" />
//         </div>
//         <div className="h-52 flex justify-center items-center flex-col">
//           <div className="text-xl flex justify-center">
//             {user?.profilepic ? (
//               <img
//                 src={user?.profilepic}
//                 className="w-24 h-24 rounded-full"
//                 alt={user?.name}
//               />
//             ) : (
//               <FaCircleUser />
//             )}
//           </div>
//           <h2 className="capitalize font-bold text-3xl">
//             {user?.name ? user?.name : "Admin"}
//           </h2>
//         </div>

//         {/* Navigation Link for Admin */}
//         <div className="px-8">
//           <nav className="grid gap-1 text-left">
//             <Link
//               to="my-account"
//               className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
//             >
//               <BsPersonCircle /> Profile
//             </Link>
//             <Link
//               to="wishlist"
//               className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
//             >
//               <FaHeart />
//               Wishlist
//             </Link>
//             <Link
//               to="cart"
//               className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
//             >
//               <FaShoppingCart />
//               Carts
//             </Link>
//             <Link
//               to="my-orders"
//               className="p-2 text-2xl font-semibold flex items-center gap-2 text-white hover:text-slate-900"
//             >
//               <RiFolderUploadFill /> Orders
//             </Link>
//             <Link
//               to="my-orders"
//               className="p-2 text-2xl font-semibold flex items-center gap-2 text-red-500 hover:text-red-900"
//               onClick={handleLogout}
//               // onClick={toggleSidebar}
//             >
//               <FaPowerOff />
//               Sign Out
//             </Link>
//           </nav>
//         </div>
//       </aside>
//       {/* content */}
//       <main
//         className={`bg-slate-200 min-h-[calc(100vh-130px)] sm:max-h-[calc(100vh-210px)] w-full m-4 rounded overflow-y-scroll custom-scrollbar ${
//           isSidebarVisible ? "hidden" : "block"
//         }`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default UserPanel;






import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHeart, FaBars, FaShoppingCart, FaPowerOff, FaUserCircle, FaTimes } from "react-icons/fa";
import { RiFolderUploadFill } from "react-icons/ri";
import { toast } from "react-toastify";
import SummaryApi from "../common/API";
import { setUserDetails } from "../store/userSlice";

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.userLogout.url, {
        method: SummaryApi.userLogout.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div className="flex sm:flex-row flex-col p-4 gap-4 min-h-screen" style={{paddingTop:"70px", paddingBottom:"70px"}}>
      {/* Sidebar Toggle Button (Mobile) */}
      <div className="cursor-pointer p-2 md:hidden" onClick={toggleSidebar}>
        <FaBars size={24} />
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white min-h-[calc(100vh-160px)] w-full max-w-64 m-4 rounded-lg shadow-lg overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarVisible ? "block" : "hidden"
        } sm:block`}
      >
        {/* Close Button (Mobile) */}
        <div className="absolute top-2 right-2 cursor-pointer md:hidden" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-6">
          <div className="text-4xl">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                alt={user?.name}
              />
            ) : (
              <FaUserCircle size={96} />
            )}
          </div>
          <h2 className="capitalize font-semibold text-xl mt-3">
            {user?.name || "Admin"}
          </h2>
        </div>

        {/* Navigation */}
        <nav className="px-6 space-y-2">
          {[{ to: "my-account", icon: <FaUserCircle />, label: "Profile" },
            { to: "wishlist", icon: <FaHeart />, label: "Wishlist" },
            { to: "cart", icon: <FaShoppingCart />, label: "Cart" },
            { to: "my-orders", icon: <RiFolderUploadFill />, label: "Orders" }].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 text-lg font-semibold p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-lg font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300 w-full p-3"
          >
            <FaPowerOff className="text-xl" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="bg-gray-200 w-full m-4 rounded-lg shadow-lg p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;
