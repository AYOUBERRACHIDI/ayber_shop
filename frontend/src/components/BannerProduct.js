import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Import des images de bannière
import banner1 from "../assest/banner/banner1.jpg";
import banner2 from "../assest/banner/banner2.jpg";

// Animation pour le fadeIn
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const BannerContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000; // Fond noir par défaut
  display: flex;
  align-items: center;
  justify-content: flex-start; // Alignement à gauche
  overflow: hidden;
  position: relative;
`;

const CarouselImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const ContentWrapper = styled.div`
  text-align: left; // Alignement du texte à gauche
  color: #fff;
  padding: 0 10%; // Marge à gauche
  z-index: 10;
  max-width: 600px; // Largeur maximale du contenu
`;

const AnimatedContent = styled.div`
  padding: 40px;
  border-radius: 16px;
  animation: ${fadeIn} 1.5s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 24px;
  color: #fff;
  line-height: 1.2;
  span {
    color: #ff6b35; // Orange
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 32px;
  opacity: 0.9;
  color: #fff;
  line-height: 1.6;
`;

const CTAButton = styled.a`
  background-color: #ff6b35; // Orange
  color: #fff;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
  display: inline-block;

  &:hover {
    background-color: #000; // Noir au survol
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  }
`;

const BannerProduct = () => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [banner1];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <BannerContainer>
      {images.map((image, index) => (
        <CarouselImage
          key={index}
          image={image}
          isActive={index === activeImage}
        />
      ))}
      <ContentWrapper>
        <AnimatedContent>
          <Title>
            Welcome to <span>AYBER</span>
          </Title>
          <Subtitle>
            Discover the latest and most innovative electronics products
          </Subtitle>
          <CTAButton href="/category-product">Shop Now</CTAButton>
        </AnimatedContent>
      </ContentWrapper>
    </BannerContainer>
  );
};

export default BannerProduct;