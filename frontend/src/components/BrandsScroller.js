import React from "react";
import styled, { keyframes } from "styled-components";

// Animation pour le défilement
const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

// Styled Components
const ScrollerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: #f8f9fa; // Fond clair
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #e0e0e0; // Bordure supérieure
  border-bottom: 1px solid #e0e0e0; // Bordure inférieure
`;

const Scroller = styled.div`
  display: flex;
  width: 200%;
  animation: ${scroll} 20s linear infinite; // Animation plus lente
`;

const Logo = styled.img`
  width: 80px; // Taille réduite
  height: 80px; // Taille fixe pour un rendu uniforme
  margin: 0 15px; // Espacement réduit
  object-fit: contain; // Assure que les logos ne sont pas déformés
  filter: grayscale(100%); // Logos en noir et blanc par défaut
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%); // Couleur d'origine au survol
    transform: scale(1.1); // Légère mise à l'échelle au survol
  }
`;

const brands = [
  "https://static-00.iconduck.com/assets.00/xiaomi-icon-256x256-mwxjqftj.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRujWSMCod5T-6LfkhoKW4pItwyZTKI_fXqSg&s",
  "https://cdn-icons-png.flaticon.com/512/15/15476.png",
  "https://static-00.iconduck.com/assets.00/dell-icon-512x512-j8rvnip3.png",
  "https://i.pinimg.com/736x/ca/ec/2d/caec2ddfc4c22d0978bf4f6030294cb0.jpg",
  "https://cdn.iconscout.com/icon/free/png-256/free-huawei-logo-icon-download-in-svg-png-gif-file-formats--brand-brands-and-logos-pack-icons-2673839.png",
  "https://cdn.iconscout.com/icon/free/png-256/free-jbl-282870.png",
  "https://static.vecteezy.com/system/resources/previews/020/927/489/non_2x/infinix-brand-logo-phone-symbol-name-black-design-china-mobile-illustration-free-vector.jpg",
  "https://miro.medium.com/v2/resize:fit:1056/1*nYbKJr9SdqE9AwmpwXYx5w.png",
  "https://logodownload.org/wp-content/uploads/2021/03/oppo-logo-0.png",
];

const BrandsScroller = () => {
  return (
    <ScrollerContainer>
      <Scroller>
        {brands.concat(brands).map((brand, index) => (
          <Logo key={index} src={brand} alt="Brand Logo" />
        ))}
      </Scroller>
    </ScrollerContainer>
  );
};

export default BrandsScroller;