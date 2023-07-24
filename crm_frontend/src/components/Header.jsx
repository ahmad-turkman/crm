import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { Link } from 'react-router-dom';
import React from 'react';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const Header = () => {
  const [active, setActive] = React.useState('home');
  return (
    <Navbar appearance="inverse">
      <Navbar.Brand href="/">NATN</Navbar.Brand>
      <Nav activeKey={active} onSelect={setActive}>
        <Nav.Item as={NavLink} href="/" eventKey="home" icon={<HomeIcon />}>
          Home
        </Nav.Item>
        {/* <Nav.Item as={NavLink} href="/news" eventKey="news">
          News
        </Nav.Item>
        <Nav.Item eventKey="solutions">Solutions</Nav.Item>
        <Nav.Item eventKey="products">Products</Nav.Item>
        <Nav.Item eventKey="about">About</Nav.Item> */}
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon spin style={{ fontSize: '1.5em' }} />}>
          Settings
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
