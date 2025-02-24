import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINR from "../helpers/displayCurrency";
import useAddToCart from "../helpers/AddToCart";
import AddToWishList from "../helpers/AddToWishlist";
import DeleteToWishList from "../helpers/DeleteWishListProduct";
import context from "../context/Context";
import SummaryApi from "../common/API";

// Styles avec styled-components
const Container = styled.div`
  padding: 0 1rem;
  margin: 1rem auto;
  position: relative;
  background-color: #000; // Noir
  color: #fff; // Blanc

  @media (min-width: 768px) {
    padding: 0 2.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff; // Blanc

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const ScrollButton = styled.button`
  background-color: #f97316; // Orange
  color: #fff; // Blanc
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 1.125rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductList = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;
  scrollbar-width: none;
  transition: all 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`;

const ProductCard = styled(Link)`
  width: 100%;
  min-width: 200px;
  max-width: 240px;
  background-color: #1a1a1a; // Gris très foncé
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1); // Ombre claire
  position: relative;
  text-decoration: none;
  color: #fff; // Blanc

  @media (min-width: 768px) {
    min-width: 280px;
    max-width: 320px;
  }
`;

const ProductImageContainer = styled.div`
  background-color: black; // Gris foncé
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 10rem;
  position: relative;

  @media (min-width: 768px) {
    height: 12rem;
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isWishlisted }) => (isWishlisted ? "#ef4444" : "#fff")}; // Rouge ou Blanc
  transition: color 0.3s ease;

  &:hover {
    color: #ef4444; // Rouge
  }
`;

const ProductImage = styled.img`
  object-fit: contain;
  height: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductDetails = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductName = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #fff; // Blanc
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ProductCategory = styled.p`
  font-size: 0.75rem;
  color: #ccc; // Gris clair
  text-transform: capitalize;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SellingPrice = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #ef4444; // Rouge

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const OriginalPrice = styled.p`
  font-size: 0.75rem;
  color: #ccc; // Gris clair
  text-decoration: line-through;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const StockStatus = styled.p`
  font-size: 0.75rem;
  color: ${({ stock }) => (stock > 0 ? "#22c55e" : "#ef4444")}; // Vert ou Rouge

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const AddToCartButton = styled.button`
  font-size: 0.75rem;
  background-color: #f97316; // Orange
  color: #fff; // Blanc
  border: none;
  border-radius: 9999px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ea580c; // Orange foncé
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

// Composant principal
const VerticalProductCard = ({ category, heading }) => {
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const scrollElement = useRef();
  const addToCart = useAddToCart();
  const { fetchAddToWishListCount } = useContext(context);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchCategoryWiseProduct(category);
      setData(result.product);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    if (user?._id) {
      try {
        const response = await fetch(SummaryApi.getWishList.url, {
          method: SummaryApi.getWishList.method,
          headers: { "Content-Type": "application/json" },
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

  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();
    const wishlistItem = wishlist.find((item) => item?.productId?._id === productId);

    if (wishlistItem) {
      await DeleteToWishList(e, wishlistItem._id);
    } else {
      await AddToWishList(e, productId);
    }

    fetchAddToWishListCount();
    fetchWishlist();
  };

  useEffect(() => {
    fetchData();
    fetchWishlist();
  }, [user]);

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollElement.current.scrollLeft += direction === 'right' ? scrollAmount : -scrollAmount;
  };

  return (
    <Container>
      <Header>
        <Title>{heading || 'Default Heading'}</Title>
        <div>
          <ScrollButton onClick={() => scroll('left')}>
            <FaAngleLeft />
          </ScrollButton>
          <ScrollButton onClick={() => scroll('right')}>
            <FaAngleRight />
          </ScrollButton>
        </div>
      </Header>
      <ProductList ref={scrollElement}>
        {loading ? (
          Array.from({ length: 13 }).map((_, index) => (
            <ProductCard key={index}>
              <ProductImageContainer />
              <ProductDetails>
                <ProductName />
                <ProductCategory />
                <PriceContainer>
                  <SellingPrice />
                  <OriginalPrice />
                </PriceContainer>
                <StockStatus stock={0} />
                <AddToCartButton disabled>Add to cart</AddToCartButton>
              </ProductDetails>
            </ProductCard>
          ))
        ) : (
          data.map((product) => (
            <ProductCard to={`/product/${product._id}`} key={product._id}>
              <ProductImageContainer>
                <WishlistButton
                  isWishlisted={wishlist.some((item) => item?.productId?._id === product?._id)}
                  onClick={(e) => handleWishlistToggle(e, product?._id)}
                >
                  {wishlist.some((item) => item?.productId?._id === product?._id) ? <FaHeart /> : <FaRegHeart />}
                </WishlistButton>
                <ProductImage src={product.productImage[0]} alt={product.productName} />
              </ProductImageContainer>
              <ProductDetails>
                <ProductName>{product?.productName}</ProductName>
                <ProductCategory>{product?.category}</ProductCategory>
                <PriceContainer>
                  <SellingPrice>{displayINR(product?.sellingPrice)}</SellingPrice>
                  <OriginalPrice>{displayINR(product?.price)}</OriginalPrice>
                </PriceContainer>
                <StockStatus stock={product?.stock}>
                  {product?.stock > 0 ? `${product?.stock} Available` : "Out of stock"}
                </StockStatus>
                <AddToCartButton
                  onClick={(e) => addToCart(e, product?._id)}
                  disabled={product?.stock === 0}
                >
                  Add to cart
                </AddToCartButton>
              </ProductDetails>
            </ProductCard>
          ))
        )}
      </ProductList>
    </Container>
  );
};

export default VerticalProductCard;




// import React, { useContext, useEffect, useRef, useState } from "react";
// import { FaAngleLeft, FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
// import displayINR from "../helpers/displayCurrency";
// import useAddToCart from "../helpers/AddToCart";
// import AddToWishList from "../helpers/AddToWishlist";
// import DeleteToWishList from "../helpers/DeleteWishListProduct";
// import context from "../context/Context";
// import SummaryApi from "../common/API";

// // Styles avec styled-components
// const Container = styled.div`
//   padding: 0 1rem;
//   margin: 1rem auto;
//   position: relative;
//   background-color:black;

//   @media (min-width: 768px) {
//     padding: 0 2.5rem;
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const Title = styled.h1`
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: white; // Noir

//   @media (min-width: 768px) {
//     font-size: 1.875rem;
//   }
// `;

// const ScrollButton = styled.button`
//   background-color: #f97316; // Orange
//   color: #fff; // Blanc
//   border: none;
//   border-radius: 50%;
//   padding: 0.5rem;
//   font-size: 1.125rem;
//   cursor: pointer;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: scale(1.15);
//   }

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const ProductList = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   overflow-x: scroll;
//   scrollbar-width: none;
//   transition: all 0.3s ease;
  

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   @media (max-width: 768px) {
//     gap: 0.25rem;
//   }
// `;

// const ProductCard = styled(Link)`
//   width: 100%;
//   min-width: 200px;
//   max-width: 240px;
// background-color: black;
//   border-radius: 0.375rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   position: relative;
//   text-decoration: none;
//   color: inherit;

//   @media (min-width: 768px) {
//     min-width: 280px;
//     max-width: 320px;
//   }
// `;

// const ProductImageContainer = styled.div`
//   background-color: black; // Gris clair
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 1rem;
//   height: 10rem;
//   position: relative;

//   @media (min-width: 768px) {
//     height: 12rem;
//   }
// `;

// const WishlistButton = styled.button`
//   position: absolute;
//   top: 0.5rem;
//   right: 0.5rem;
//   font-size: 1.25rem;
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: ${({ isWishlisted }) => (isWishlisted ? "#ef4444" : "white")}; // Rouge ou Gris
//   transition: color 0.3s ease;

//   &:hover {
//     color: #ef4444; // Rouge
//   }
// `;

// const ProductImage = styled.img`
//   object-fit: contain;
//   height: 100%;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const ProductDetails = styled.div`
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const ProductName = styled.h2`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #000; // Noir
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;

//   @media (min-width: 768px) {
//     font-size: 1.125rem;
//   }
// `;

// const ProductCategory = styled.p`
//   font-size: 0.75rem;
//   color: white; // Gris
//   text-transform: capitalize;

//   @media (min-width: 768px) {
//     font-size: 0.875rem;
//   }
// `;

// const PriceContainer = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const SellingPrice = styled.p`
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: #ef4444; // Rouge

//   @media (min-width: 768px) {
//     font-size: 1rem;
//   }
// `;

// const OriginalPrice = styled.p`
//   font-size: 0.75rem;
//   color: white; // Gris
//   text-decoration: line-through;

//   @media (min-width: 768px) {
//     font-size: 0.875rem;
//   }
// `;

// const StockStatus = styled.p`
//   font-size: 0.75rem;
//   color: ${({ stock }) => (stock > 0 ? "#22c55e" : "#ef4444")}; // Vert ou Rouge

//   @media (min-width: 768px) {
//     font-size: 0.875rem;
//   }
// `;

// const AddToCartButton = styled.button`
//   font-size: 0.75rem;
//   background-color: #f97316; // Orange
//   color: #fff; // Blanc
//   border: none;
//   border-radius: 9999px;
//   padding: 0.5rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #ea580c; // Orange foncé
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   @media (min-width: 768px) {
//     font-size: 0.875rem;
//   }
// `;

// // Composant principal
// const VerticalProductCard = ({ category, heading }) => {
//   const user = useSelector((state) => state?.user?.user);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [wishlist, setWishlist] = useState([]);
//   const scrollElement = useRef();
//   const addToCart = useAddToCart();
//   const { fetchAddToWishListCount } = useContext(context);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const result = await fetchCategoryWiseProduct(category);
//       setData(result.product);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWishlist = async () => {
//     if (user?._id) {
//       try {
//         const response = await fetch(SummaryApi.getWishList.url, {
//           method: SummaryApi.getWishList.method,
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//         });
//         const result = await response.json();
//         if (result.success) {
//           setWishlist(result.data);
//         }
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     }
//   };

//   const handleWishlistToggle = async (e, productId) => {
//     e.preventDefault();
//     const wishlistItem = wishlist.find((item) => item?.productId?._id === productId);

//     if (wishlistItem) {
//       await DeleteToWishList(e, wishlistItem._id);
//     } else {
//       await AddToWishList(e, productId);
//     }

//     fetchAddToWishListCount();
//     fetchWishlist();
//   };

//   useEffect(() => {
//     fetchData();
//     fetchWishlist();
//   }, [user]);

//   const scroll = (direction) => {
//     const scrollAmount = 300;
//     scrollElement.current.scrollLeft += direction === 'right' ? scrollAmount : -scrollAmount;
//   };

//   return (
//     <Container>
//       <Header>
//         <Title>{heading || 'Default Heading'}</Title>
//         <div>
//           <ScrollButton onClick={() => scroll('left')}>
//             <FaAngleLeft />
//           </ScrollButton>
//           <ScrollButton onClick={() => scroll('right')}>
//             <FaAngleRight />
//           </ScrollButton>
//         </div>
//       </Header>
//       <ProductList ref={scrollElement}>
//         {loading ? (
//           Array.from({ length: 13 }).map((_, index) => (
//             <ProductCard key={index}>
//               <ProductImageContainer />
//               <ProductDetails>
//                 <ProductName />
//                 <ProductCategory />
//                 <PriceContainer>
//                   <SellingPrice />
//                   <OriginalPrice />
//                 </PriceContainer>
//                 <StockStatus stock={0} />
//                 <AddToCartButton disabled>Add to cart</AddToCartButton>
//               </ProductDetails>
//             </ProductCard>
//           ))
//         ) : (
//           data.map((product) => (
//             <ProductCard to={`/product/${product._id}`} key={product._id}>
//               <ProductImageContainer>
//                 <WishlistButton
//                   isWishlisted={wishlist.some((item) => item?.productId?._id === product?._id)}
//                   onClick={(e) => handleWishlistToggle(e, product?._id)}
//                 >
//                   {wishlist.some((item) => item?.productId?._id === product?._id) ? <FaHeart /> : <FaRegHeart />}
//                 </WishlistButton>
//                 <ProductImage src={product.productImage[0]} alt={product.productName} />
//               </ProductImageContainer>
//               <ProductDetails>
//                 <ProductName>{product?.productName}</ProductName>
//                 <ProductCategory>{product?.category}</ProductCategory>
//                 <PriceContainer>
//                   <SellingPrice>{displayINR(product?.sellingPrice)}</SellingPrice>
//                   <OriginalPrice>{displayINR(product?.price)}</OriginalPrice>
//                 </PriceContainer>
//                 <StockStatus stock={product?.stock}>
//                   {product?.stock > 0 ? `${product?.stock} Available` : "Out of stock"}
//                 </StockStatus>
//                 <AddToCartButton
//                   onClick={(e) => addToCart(e, product?._id)}
//                   disabled={product?.stock === 0}
//                 >
//                   Add to cart
//                 </AddToCartButton>
//               </ProductDetails>
//             </ProductCard>
//           ))
//         )}
//       </ProductList>
//     </Container>
//   );
// };

// export default VerticalProductCard;