import { Navbar, Nav, Button } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { Link, useNavigate } from 'react-router-dom';
import OffIcon from '@rsuite/icons/Off';
import React from 'react';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const Header = () => {
  const [active, setActive] = React.useState('home');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Navbar appearance="inverse">
      <Navbar.Brand href="/">NATN</Navbar.Brand>
      <Nav activeKey={active} onSelect={setActive}>
        <Nav.Item as={NavLink} href="/" eventKey="home" icon={<HomeIcon />}>
          Home
        </Nav.Item>
      </Nav>
      <Nav pullRight style={{ marginRight: '10px' }}>
        <Nav.Menu icon={<CogIcon spin style={{ fontSize: '1.5em' }} />}>
          <Nav.Item as={Button} icon={<OffIcon />} onClick={() => logout()}>
            logout
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    </Navbar>
  );
};

export default Header;
