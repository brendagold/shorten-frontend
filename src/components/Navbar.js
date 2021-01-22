import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  Container,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './css/navbar.css';

const HeadNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="head-nav" light expand="md">
        <Container>
          <NavbarBrand className="nav-brand" href="/">
            Shorten
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="head-link" href="/register">
                  Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="head-link" href="/login">
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeadNav;
