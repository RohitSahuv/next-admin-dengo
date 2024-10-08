import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import Link from 'next/link';
import { FiDollarSign, FiShoppingCart, FiBarChart2, FiLogOut, FiMenu } from 'react-icons/fi';
import { IoMdHome, IoIosPeople } from "react-icons/io";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaRegCalendar } from "react-icons/fa6";
import { MdLibraryBooks } from "react-icons/md";
import Image from "next/image";

const Aside = styled.aside`
  top: 3.5rem;
  padding: 2rem 0 0 1.5rem;
  position: fixed;
  width: 16rem;
  background-color: #fff;
  height: 90vh;
  transition: all 0.3s;
  margin-top: 0.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: ${props => (props.show ? 'block' : 'none')};
    @media (min-width: 768px) {
    width: 16rem;
    position : relative;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 0px 12px 18px;
  color: ${props => (props.$active ? '#000' : '#4B5563')};
  background-color: ${props => (props.$active ? '#F0F0F0' : 'transparent')};
  cursor: pointer;
  border-left: 3px solid ${props => (props.$active ? '#595959' : 'transparent')};

  &:hover {
    background-color: #F0F0F0;
  }
`;

const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;


const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
`;

export default function Navbar({ sidebarOpen }) {
  const router = useRouter();
  const { pathname } = router;

  async function logout() {
    await router.push('/');
    await signOut();
  }

  const links = [
    { href: '/', label: 'Home', icon: IoMdHome },
    { href: '/program', label: 'Program', icon: GoFileDirectoryFill },
    { href: '/people', label: 'People', icon: IoIosPeople },
    { href: '/activity', label: 'Activity', icon: FaRegCalendar },
    { href: '/billing', label: 'Billing', icon: MdLibraryBooks },
    { href: '/marketplace', label: 'Marketplace', icon: FiShoppingCart },
    { href: '/insights', label: 'Insights', icon: FiBarChart2 },
  ];

  return (
    <>
      <Aside show={sidebarOpen}>
        <NavContainer>
          {links.map(link => (
            <Link key={link.href} href={link.href} passHref>
              <NavLink key={link.href} $active={pathname === link.href}>
                <Icon as={link.icon} fill='black' />
                {link.label}
              </NavLink>
            </Link>
          ))}
        </NavContainer>
      </Aside>
    </>
  );
}
