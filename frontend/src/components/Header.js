import { GrSearch } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/Role";
import { useCart } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";
import Context from "../context/Context";
import styled from "styled-components";

// Styled Components
const HeaderWrapper = styled.header`
  background-color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 40;
`;

const TopBar = styled.div`
  background-color: black;
  padding: 0.5rem 0;
  color: white;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.5rem 0;

  a {
    color: gray;
    transition: color 0.3s;

    &:hover {
      color: orange;
    }
  }
`;

const MainNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid #ff6b35;
    padding: 0.25rem;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  span {
    margin-left: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff6b35;
  }
`;

const SearchBar = styled.div`
  background-color: black;
  display: none;
  align-items: center;
  width: 100%;
  max-width: 28rem;
  border: 1px solid black;
  border-radius: 9999px;
  overflow: hidden;
  padding-left: 1rem;
  &:hover {
      border: 1px solid #ff6b35;
    }

  @media (min-width: 768px) {
    display: flex;
  }

  input {
    width: 100%;
    outline: none;
    border: none;
  }

  div {
    background-color: #ff6b35;
    color: white;
    min-width: 3rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darkorange;
    }
  }
`;

const MobileSearchBar = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: black;
  border-top: 1px solid #ccc;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    outline: none;
    background-color: black;
    &:hover {
      border: 1px solid #ff6b35;
    }
  }

  div {
    background-color: #ff6b35;
    color: white;
    padding: 0.5rem;
    margin-left: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darkorange;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconLink = styled(Link)`
  font-size: 1.5rem;
  color: white;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: orange;
  }

  div {
    background-color: orange;
    color: white;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    font-size: 0.75rem;
  }
`;

const ProfileDropdown = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 12rem;
  padding: 0.5rem 0;

  a,
  button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.5rem 1rem;
    color: gray;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: black;
  padding: 1rem;
  border-top: 1px solid #ccc;

  a {
    display: block;
    padding: 0.5rem 0;
    color: white;
    transition: color 0.3s;

    &:hover {
      color: orange;
    }
  }
`;

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const context = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location?.search);
  const searchQuery = urlSearch.getAll("q");
  const [searchValue, setSearchValue] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchDate = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: "include",
    });

    const data = await fetchDate.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  };

  const handleMobileSearch = () => {
    if (searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  };

  return (
    <HeaderWrapper>
      {/* Top Bar */}
      <TopBar>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span>Welcome to AYBER</span>
              <span>Call Us: +212 637 056 366</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/About" className="hover:text-orange-200">
                About
              </Link>
              <Link to="/contact" className="hover:text-orange-200">
                Contact
              </Link>
              {user?._id ? (
                <button onClick={handleLogout} className="hover:text-orange-200">
                  Logout
                </button>
              ) : (
                <Link to="/signin" className="hover:text-orange-200">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </TopBar>

      {/* Main Navbar */}
      <MainNavbar className="container mx-auto px-6">
        {/* Logo */}
        <Logo to="/">
          <img src="/AYBER.png" alt="AYBER Logo" />
          <span>AYBER</span>
        </Logo>

        {/* Search Bar */}
        <SearchBar>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchValue}
            onChange={handleSearch}
            style={{backgroundColor:"black", color:"white"}}
          />
          <div>
            <GrSearch />
          </div>
        </SearchBar>

        {/* User Actions */}
        <UserActions>
          {/* Mobile Search Icon */}
          <MobileMenuButton onClick={() => setSearchOpen((prev) => !prev)}>
            <GrSearch />
          </MobileMenuButton>

          {/* Wishlist */}
          {user?._id && user?.role === ROLE.USER && (
            <IconLink to="/user-panel/wishlist">
              <FaHeart />
              {context.wishListProductCount > 0 && (
                <div>{context.wishListProductCount}</div>
              )}
            </IconLink>
          )}

          {/* Cart */}
          {user?._id && user?.role === ROLE.USER && (
            <IconLink to="/user-panel/cart">
              <FaShoppingCart />
              {cartCount > 0 && <div>{cartCount}</div>}
            </IconLink>
          )}

          {/* User Profile */}
          <ProfileDropdown>
            {user?._id ? (
              <div onClick={() => setMenuDisplay((prev) => !prev)}>
                {user?.profilepic ? (
                  <img
                    src={user.profilepic}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-orange-600 hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <FaCircleUser className="text-3xl text-white hover:text-orange-600 transition-colors duration-300" />
                )}
              </div>
            ) : (
              <Link to="/signin">
                <FaCircleUser className="text-3xl text-white hover:text-orange-600 transition-colors duration-300" />
              </Link>
            )}

            {/* Dropdown Menu */}
            {menuDisplay && (
              <DropdownMenu>
                {user?.role === ROLE.ADMIN ? (
                  <Link
                    to="/admin-panel/all-products"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/user-panel/my-account"
                    onClick={() => setMenuDisplay(false)}
                  >
                    My Account
                  </Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenu>
            )}
          </ProfileDropdown>

          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={() => setMobileMenuOpen((prev) => !prev)}>
            ☰
          </MobileMenuButton>
        </UserActions>
      </MainNavbar>

      {/* Mobile Search Bar */}
      <MobileSearchBar isOpen={searchOpen}>
        <input
          type="text"
          placeholder="Search for products, brands and more..."
          value={searchValue}
          onChange={handleSearch}
        />
        <div onClick={handleMobileSearch}>
          <GrSearch />
        </div>
      </MobileSearchBar>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/category-product">Categories</Link>
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;