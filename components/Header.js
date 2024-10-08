import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { FiMenu } from 'react-icons/fi';

const Hamburger = styled(FiMenu)`
  display: none;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    display: block;
  }
`;


export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link href="/" passHref>
          <LogoLink>
            <Image
              src="/logo-dengo.png"
              alt="logo"
              width={100}
              height={24}
            />
            <LogoText>for residential</LogoText>
          </LogoLink>
        </Link>
      </LogoContainer>
      <Nav>
        <Status>
          <StatusDot />
          Active
        </Status>
        <HelpButton>Help</HelpButton>
        <UserIcon>CV</UserIcon>
        <Hamburger onClick={() => setSidebarOpen(!sidebarOpen)} />
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width  : 100%;
  position : fixed;
  z-index : 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin : 7px 0 0 49px;
`;

const LogoLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  cursor: pointer;
`;

const LogoText = styled.span`
  font-size: 14px;
  color: #000;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 14px;
   @media (max-width: 768px) {
    display: none;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
`;

const HelpButton = styled.button`
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
     @media (max-width: 768px) {
    display: none;
  }
`;

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;
