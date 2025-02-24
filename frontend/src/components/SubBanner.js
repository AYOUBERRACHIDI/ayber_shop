import React from "react";
import styled from "styled-components";

// Styled Components
const SubBannerContainer = styled.div`
  width: 100%;
  padding: 40px 20px;
  background-color:black; // Fond clair
  text-align: center;
  margin: 40px 0;
`;

const SubBannerTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  color:white;
`;

const SubBannerDescription = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 24px; 
  color:white;

`;

const SubBannerButton = styled.a`
  background-color: #ff6b35; // Orange
  color: #fff;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);

  &:hover {
    background-color: #000; // Noir au survol
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }
`;

const SubBanner = () => {
  return (
    <SubBannerContainer>
      <hr/>
      <SubBannerTitle>Discover the latest and most innovative electronics products</SubBannerTitle>
      <SubBannerDescription>
        Explore our limited-time offers on top brands and products.
      </SubBannerDescription>
      <SubBannerButton href="/category-product">Shop Now</SubBannerButton>
    </SubBannerContainer>
  );
};

export default SubBanner;