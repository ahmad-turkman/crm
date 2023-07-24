import React from 'react';

import { Sidenav, Nav } from 'rsuite';
import { Icon } from '@rsuite/icons';
import {
  FaBox,
  FaBuilding,
  FaBusinessTime,
  FaFunnelDollar,
  FaListUl,
  FaUserCheck,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const Sidenavigation = ({ isExpanded }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState('');
  return (
    <div style={{ height: '100%', width: isExpanded ? '100%' : '200px' }}>
      <Sidenav
        appearance="inverse"
        onMouseOver={isExpanded ? () => {} : () => setExpanded(true)}
        onMouseLeave={isExpanded ? () => {} : () => setExpanded(false)}
        expanded={isExpanded ? true : expanded}
        style={{ height: '100%' }}
      >
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              as={NavLink}
              href="/contacts"
              eventKey="1"
              icon={<Icon as={FaBuilding} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              My Company
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/customers"
              eventKey="2"
              icon={<Icon as={FaUsers} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Customers
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/leads"
              eventKey="3"
              icon={<Icon as={FaUserPlus} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Leads
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/products"
              eventKey="4"
              icon={<Icon as={FaBox} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Products
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/steps"
              eventKey="5"
              icon={<Icon as={FaListUl} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Sales Steps
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/opps"
              eventKey="6"
              icon={<Icon as={FaUserCheck} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Opportunities
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/funnel"
              eventKey="7"
              icon={<Icon as={FaFunnelDollar} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Funnel
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/cap"
              eventKey="8"
              icon={<Icon as={FaBusinessTime} size="1.5em" />}
              style={{ textDecoration: 'none' }}
            >
              Commercial Action Plan (CAP)
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Sidenavigation;
