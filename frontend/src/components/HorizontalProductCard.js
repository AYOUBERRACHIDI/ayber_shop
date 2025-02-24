// import React, { useContext, useEffect, useRef, useState } from "react";
// import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
// import displayINR from "../helpers/displayCurrency";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import useAddToCart from "../helpers/AddToCart";
// import { FaHeart } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import SummaryApi from "../common/API";
// import { toast } from "react-toastify";
// import AddToWishList from "../helpers/AddToWishlist";
// import context from "../context/Context";
// import DeleteToWishList from "../helpers/DeleteWishListProduct";

// const HorizontalProductCard = ({ category, heading }) => {
//   const user = useSelector((state) => state?.user?.user);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const loadingList = new Array(13).fill(null);
//   const navigate = useNavigate();

//   const { fetchAddToWishListCount } = useContext(context);

//   const [scroll, setScroll] = useState(0);
//   const scrollElement = useRef();

//   const [wishlist, setWishlist] = useState([]);

//   const addToCart = useAddToCart();

//   const handleWishlistToggle = async (e, productId) => {
//     e.preventDefault();

//     const wishlistItem = getWishlistItemByProductId(productId);
//     if (wishlistItem) {
//       await DeleteToWishList(e, wishlistItem._id);
//       // toast.success("Removed from Wishlist");
//     } else {
//       await AddToWishList(e, productId);
//       // toast.success("Added to Wishlist");
//     }
//     fetchAddToWishListCount();
//     fetchWishlist();
//   };

//   const getWishlistItemByProductId = (productId) => {
//     return wishlist.find((item) => item?.productId?._id === productId);
//   };

//   const isProductInWishlist = (productId) => {
//     return Boolean(getWishlistItemByProductId(productId));
//   };


//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const result = await fetchCategoryWiseProduct(category);
//       setData(result.product); // Ensure result.product is the correct path
//       // console.log(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setData([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const scrollRight = () => {
//     scrollElement.current.scrollLeft += 300;
//   };

//   const scrollLeft = () => {
//     scrollElement.current.scrollLeft -= 300;
//   };

//   const fetchWishlist = async () => {
//     if (user?._id) {
//       try {
//         const response = await fetch(SummaryApi.getWishList.url, {
//           method: SummaryApi.getWishList.method,
//           headers: {
//             "content-type": "application/json",
//           },
//           credentials: "include",
//         });
//         const result = await response.json();
//         if (result.success) {
//           setWishlist(result.data);
//           // console.log(result.data)
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     }
//     // console.log("Wishlist Data",wishlist)
//   };

//   useEffect(() => {
//     fetchData();
//     fetchWishlist();
//   }, [user]);

//   // const isProductInWishlist = (productId) => {
//   //   return wishlist.some((item) => item?.productId?._id === productId);
//   // };

//   return (
//     <div className="px-10 my-4 mx-auto relative">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-semibold py-4">{heading}</h1>
//         <div className="flex gap-2">
//           <button
//             className="bg-slate-200 rounded-full shadow-md p-1 text-lg hidden md:block hover:scale-150 transition-all"
//             onClick={scrollLeft}
//           >
//             <FaAngleLeft />
//           </button>
//           <button
//             className="bg-slate-200 rounded-full shadow-md p-1 text-lg hidden md:block hover:scale-150 transition-all"
//             onClick={scrollRight}
//           >
//             <FaAngleRight />
//           </button>
//         </div>
//       </div>

//       <div
//         className="flex items-center gap-2 md:gap-6 overflow-scroll scrollbar-none transition-all"
//         ref={scrollElement}
//       >
//         {loading
//           ? loadingList.map((product, index) => {
//               return (
//                 <div
//                   className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
//                   key={index}
//                 >
//                   <div className="bg-slate-200 p-4 h-full min-w-[120px] md:min-w-[150px] animate-pulse"></div>
//                   <div className="p-4 flex flex-col justify-between w-full">
//                     <h2 className="text-lg font-semibold text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 py-2 w-full animate-pulse rounded-full"></h2>
//                     <p className="text-slate-500 capitalize p-1 bg-slate-200 animate-pulse py-2 rounded-full"></p>
//                     <div className="flex gap-3">
//                       <p className="text-md text-red-600 font-semiboldbold p-1 bg-slate-200 w-full animate-pulse py-2 rounded-full"></p>
//                       <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse py-2 rounded-full"></p>
//                     </div>
//                     <button className="text-sm w-full text-white rounded-full p-1 bg-slate-200 animate-pulse py-2"></button>
//                   </div>
//                 </div>
//               );
//             })
//           : data.map((product, index) => {
//               return (
//                 <Link
//                   to={`product/${product?._id}`}
//                   className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
//                   key={index}
//                 >
//                   <div className="bg-slate-200 p-4 h-full min-w-[120px] md:min-w-[150px]">
//                     <img
//                       src={product.productImage[0]}
//                       className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
//                       alt={product?.productName}
//                     />
//                   </div>
//                   <div className="p-2 flex flex-col justify-between ">
//                     <div className="relative flex justify-end pb-6">
//                       {user?._id ? (
//                         <button
//                           className={`absolute top-0 right-0 text-2xl ${
//                             isProductInWishlist(product?._id)
//                               ? "text-red-500"
//                               : "text-slate-800"
//                           }`}
//                           onClick={(e) => handleWishlistToggle(e, product?._id)}
//                         >
//                           {isProductInWishlist(product?._id) ? (
//                             <FaHeart />
//                           ) : (
//                             <FaRegHeart />
//                           )}
//                         </button>
//                       ) : (
//                         <button
//                           className="absolute top-0 right-0 text-slate-800 text-2xl"
//                           onClick={(e) => handleWishlistToggle(e, product?._id)}
//                         >
//                           <FaRegHeart className="right-0 hover:text-3xl" />
//                         </button>
//                       )}
//                     </div>

//                     <h2 className="text-lg font-semibold text-ellipsis line-clamp-1 text-black">
//                       {product?.productName}
//                     </h2>
//                     <p className="text-slate-500 capitalize">
//                       {product?.category}
//                     </p>
//                     <div className="flex gap-3">
//                       <p className="text-md text-red-600 font-semiboldbold">
//                         {displayINR(product?.sellingPrice)}
//                       </p>
//                       <p className="text-slate-500 line-through">
//                         {displayINR(product?.price)}
//                       </p>
//                     </div>
//                     <button
//                       className="text-sm bg-red-600 hover:bg-red-800 text-white rounded-full p-1"
//                       onClick={(e) => addToCart(e, product?._id)}
//                     >
//                       Add to cart
//                     </button>
//                   </div>
//                 </Link>
//               );
//             })}
//       </div>
//     </div>
//   );
// };

// export default HorizontalProductCard;


import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINR from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAddToCart from "../helpers/AddToCart";
import { useSelector } from "react-redux";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import AddToWishList from "../helpers/AddToWishlist";
import context from "../context/Context";
import DeleteToWishList from "../helpers/DeleteWishListProduct";

const HorizontalProductCard = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const navigate = useNavigate();

  const { fetchAddToWishListCount } = useContext(context);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const [wishlist, setWishlist] = useState([]);

  const addToCart = useAddToCart();

  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();

    const wishlistItem = getWishlistItemByProductId(productId);
    if (wishlistItem) {
      await DeleteToWishList(e, wishlistItem._id);
      toast.success("Removed from Wishlist");
    } else {
      await AddToWishList(e, productId);
      toast.success("Added to Wishlist");
    }
    fetchAddToWishListCount();
    fetchWishlist();
  };

  const getWishlistItemByProductId = (productId) => {
    return wishlist.find((item) => item?.productId?._id === productId);
  };

  const isProductInWishlist = (productId) => {
    return Boolean(getWishlistItemByProductId(productId));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchCategoryWiseProduct(category);
      setData(result.product); // Ensure result.product is the correct path
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const fetchWishlist = async () => {
    if (user?._id) {
      try {
        const response = await fetch(SummaryApi.getWishList.url, {
          method: SummaryApi.getWishList.method,
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setWishlist(result.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchWishlist();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{heading}</h1>
        <div className="flex gap-2">
          <button
            className="bg-white rounded-full shadow-md p-2 text-lg hover:bg-gray-100 transition-all"
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white rounded-full shadow-md p-2 text-lg hover:bg-gray-100 transition-all"
            onClick={scrollRight}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide transition-all"
        ref={scrollElement}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading
          ? loadingList.map((product, index) => (
              <div
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 animate-pulse"
                key={index}
              >
                <div className="bg-gray-200 h-32 w-full rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={`/product/${product?._id}`}
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                key={index}
              >
                <div className="relative">
                  <img
                    src={product.productImage[0]}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    alt={product?.productName}
                  />
                  {user?._id && (
                    <button
                      className={`absolute top-2 right-2 text-2xl ${
                        isProductInWishlist(product?._id)
                          ? "text-red-500"
                          : "text-gray-300"
                      } hover:text-red-500 transition-colors`}
                      onClick={(e) => handleWishlistToggle(e, product?._id)}
                    >
                      {isProductInWishlist(product?._id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product?.productName}
                </h2>
                <p className="text-sm text-gray-500 capitalize">
                  {product?.category}
                </p>
                <div className="flex gap-2 mt-2">
                  <p className="text-md font-bold text-red-600">
                    {displayINR(product?.sellingPrice)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {displayINR(product?.price)}
                  </p>
                </div>
                <button
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                  onClick={(e) => addToCart(e, product?._id)}
                >
                  Add to cart
                </button>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalProductCard;