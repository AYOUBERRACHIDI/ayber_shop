// // import React, { useEffect } from "react";
// // import { FaCircleUser } from "react-icons/fa6";
// // import { useSelector } from "react-redux";
// // import { Link, Outlet, useNavigate } from "react-router-dom";
// // import ROLE from "../common/Role";

// // const AdminPanel = () => {
// //   const user = useSelector((state) => state?.user?.user);
// //   const navigate = useNavigate();

// //   // useEffect(() => {
// //   //   if (user?.role !== ROLE.ADMIN) {
// //   //     navigate("/");
// //   //   }
// //   // }, [user, navigate]);

// //   return (
// //     <div className="max-h-[calc(100vh-70px)] flex">
// //       <aside className="bg-slate-600 min-h-[calc(100vh-160px)] w-full max-w-64 m-5 rounded-lg text-white text-center customShadow overflow-y-auto">
// //         <div className="h-48 flex justify-center items-center flex-col">
// //           <div className="text-4xl cursor-pointer relative flex justify-center">
// //             {user?.profilepic ? (
// //               <img
// //                 src={user?.profilepic}
// //                 className="w-14 h-14 rounded-full"
// //                 alt={user?.name}
// //               />
// //             ) : (
// //               <FaCircleUser />
// //             )}
// //           </div>
// //           <h2 className="capitalize font-bold text-3xl">
// //             {user?.name ? user?.name : "Admin"}
// //           </h2>
// //           <p className="text-sm">Role : {user?.role ? user?.role : "USER"}</p>
// //         </div>

// //         {/* Navigation Link for Admin */}
// //         <div>
// //           <nav className="grid gap-1">
// //             <Link
// //               to="all-users"
// //               className="p-1 text-2xl font-bold flex items-center justify-center"
// //             >
// //               All Users
// //             </Link>
// //             <Link
// //               to="all-products"
// //               className="p-1 text-2xl font-bold flex items-center justify-center"
// //             >
// //               Products
// //             </Link>
// //             {/* <Link
// //               to="add-products"
// //               className="p-1 text-2xl font-bold flex items-center justify-center"
// //             >
// //               Add Products
// //             </Link> */}
// //           </nav>
// //         </div>
// //       </aside>

// //       <main className="w-full max-h-[calc(100vh-70px)] m-5 bg-slate-100 rounded overflow-y-auto custom-scrollbar">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminPanel;





// import React, { useEffect } from "react";
// import { FaCircleUser } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import ROLE from "../common/Role";

// const AdminPanel = () => {
//   const user = useSelector((state) => state?.user?.user);
//   const navigate = useNavigate();

//   return (
//     <div className="flex h-screen bg-gray-100" style={{paddingTop:"70px", paddingBottom:"70px"}}>
//       {/* Sidebar */}
//       <aside className="bg-gray-800 w-64 min-h-screen text-white p-5 shadow-lg flex flex-col">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-20 h-20 rounded-full border-4 border-gray-500 flex items-center justify-center bg-gray-700 overflow-hidden">
//             {user?.profilepic ? (
//               <img src={user.profilepic} className="w-full h-full object-cover" alt={user.name} />
//             ) : (
//               <FaCircleUser className="text-5xl text-gray-400" />
//             )}
//           </div>
//           <h2 className="capitalize font-semibold text-xl mt-3">{user?.name || "Admin"}</h2>
//           <p className="text-sm text-gray-400">Role: {user?.role || "USER"}</p>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-3">
//           <Link to="all-users" className="p-2 text-lg font-medium rounded-md transition bg-gray-700 hover:bg-gray-600">
//             👥 All Users
//           </Link>
//           <Link to="all-products" className="p-2 text-lg font-medium rounded-md transition bg-gray-700 hover:bg-gray-600">
//             🛍️ Products
//           </Link>
//           {/* <Link to="add-products" className="p-2 text-lg font-medium rounded-md transition bg-gray-700 hover:bg-gray-600">
//             ➕ Add Products
//           </Link> */}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-white shadow-md rounded-lg m-5 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaUsers, FaBox, FaChartLine, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/Role";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../common/API";
import styled from "styled-components";

// Styles avec styled-components
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000; // Noir
  color: #fff; // Blanc
  padding-top: 70px;
  padding-bottom: 70px;
  height: 700px;
`;

const Sidebar = styled.aside`
  background-color: #1a1a1a; // Gris très foncé
  width: 250px;
  min-height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #f97316; // Orange
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333; // Gris foncé
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 10px;
  color: #fff; // Blanc
`;

const ProfileRole = styled.p`
  font-size: 0.875rem;
  color: #f97316; // Orange
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
  background-color: #333; // Gris foncé
  color: #fff; // Blanc
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f97316; // Orange
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
  background-color: #ef4444; // Rouge
  color: #fff; // Blanc
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626; // Rouge foncé
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  height: 600px;
  background-color: #fff; // Blanc
  color: #000; // Noir
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Header = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #000; // Noir
  }

  p {
    font-size: 1rem;
    color: #666; // Gris
  }
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #f97316; // Orange
  padding: 20px;
  border-radius: 8px;
  color: #fff; // Blanc
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 2rem;
    font-weight: 700;
    margin: 10px 0;
  }

  span {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

// Composant principal
const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  // Rediriger si l'utilisateur n'est pas un administrateur
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.userLogout.url, {
        method: SummaryApi.userLogout.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        navigate("/signin");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        {/* Profile Section */}
        <ProfileSection>
          <ProfileImage>
            {user?.profilepic ? (
              <img src={user.profilepic} alt={user.name} />
            ) : (
              <FaCircleUser className="text-5xl text-gray-400" />
            )}
          </ProfileImage>
          <ProfileName>{user?.name || "Admin"}</ProfileName>
          <ProfileRole>Role: {user?.role || "USER"}</ProfileRole>
        </ProfileSection>

        {/* Navigation */}
        <nav>
          <NavLink to="all-users">
            <FaUsers className="text-xl" /> 👥 All Users
          </NavLink>
          <NavLink to="all-products">
            <FaBox className="text-xl" /> 🛍️ Products
          </NavLink>
          <NavLink to="analytics">
            <FaBox className="text-xl" /> 📦 Orders
          </NavLink>
          <NavLink to="analytics">
            <FaChartLine className="text-xl" /> 📊 Analytics
          </NavLink>
          <NavLink to="settings">
            <FaCog className="text-xl" /> ⚙️ Settings
          </NavLink>

          {/* Bouton de déconnexion */}
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt className="text-xl" /> 🚪 Logout
          </LogoutButton>
        </nav>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Header */}
        <Header>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || "Admin"}!</p>
        </Header>

        {/* Statistics Cards */}
        {/* <StatisticsGrid>
          <StatCard>
            <h2>Total Users</h2>
            <p>1,234</p>
            <span>+5.2% from last month</span>
          </StatCard>
          <StatCard>
            <h2>Total Products</h2>
            <p>567</p>
            <span>+12.3% from last month</span>
          </StatCard>
          <StatCard>
            <h2>Total Sales</h2>
            <p>$12,345</p>
            <span>+8.7% from last month</span>
          </StatCard>
        </StatisticsGrid> */}

        {/* Outlet for Nested Routes */}
        <Outlet />
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminPanel;