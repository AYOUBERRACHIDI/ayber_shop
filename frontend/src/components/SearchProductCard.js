import React from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import useAddToCart from "../helpers/AddToCart";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

// Styled Components
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 produits par ligne */
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 produits par ligne sur mobile */
    gap: 10px;
  }
`;

const ProductCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 200px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform 0.3s;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductDetails = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ProductCategory = styled.p`
  font-size: 14px;
  color: #666;
  text-transform: capitalize;
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SellingPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #e53e3e; /* Rouge pour le prix de vente */
  margin: 0;
`;

const OriginalPrice = styled.p`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin: 0;
`;

const AddToCartButton = styled.button`
  background-color: #f97316; /* Rouge pour le bouton */
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ea580c; /* Rouge plus foncé au survol */
  }
`;

const LoadingCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LoadingImage = styled.div`
  background-color: #e0e0e0;
  height: 200px;
  width: 100%;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const LoadingText = styled.div`
  background-color: #e0e0e0;
  height: 20px;
  width: 80%;
  margin: 8px 16px;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
`;

const SearchProductCard = ({ loading, data = [] }) => {
  const loadingList = new Array(6).fill(null); // 6 cartes de chargement
  const addToCart = useAddToCart();

  return (
    <ProductGrid>
      {loading
        ? loadingList.map((_, index) => (
            <LoadingCard key={index}>
              <LoadingImage />
              <ProductDetails>
                <LoadingText />
                <LoadingText />
                <LoadingText />
              </ProductDetails>
            </LoadingCard>
          ))
        : data.map((product, index) => (
            <ProductCard key={index} to={`/product/${product._id}`}>
              <ProductImageContainer>
                <ProductImage
                  src={product.productImage[0]}
                  alt={product.productName}
                />
              </ProductImageContainer>
              <ProductDetails>
                <ProductName>{product.productName}</ProductName>
                <ProductCategory>{product.category}</ProductCategory>
                <PriceContainer>
                  <SellingPrice>
                    {displayINRCurrency(product.sellingPrice)}
                  </SellingPrice>
                  <OriginalPrice>
                    {displayINRCurrency(product.price)}
                  </OriginalPrice>
                </PriceContainer>
                <AddToCartButton
                  onClick={(e) => addToCart(e, product._id)}
                >
                  Add to cart
                </AddToCartButton>
              </ProductDetails>
            </ProductCard>
          ))}
    </ProductGrid>
  );
};

export default SearchProductCard;