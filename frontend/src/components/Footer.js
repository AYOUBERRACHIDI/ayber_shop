import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #111;
  color: #fff;
  padding: 40px 0;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.h2`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: #ff4500;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #fff;
    font-size: 18px;
    transition: color 0.3s;

    &:hover {
      color: #ff4500;
    }
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  margin-top: 20px;
  opacity: 0.7;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>AYBER</Logo>
        <Nav>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/faq">FAQ</a>
        </Nav>
        <SocialIcons>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
        </SocialIcons>
        <Copyright>&copy; {new Date().getFullYear()} AYBER. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
