import React, { useState } from "react";
import styles from "./navbar.module.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  Input,
  Form
} from "reactstrap";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="lg" className="px-3" id={styles.navbarColor}>
      <NavbarBrand href="#">Groovo</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="w-100 d-flex justify-content-between align-items-center" navbar>
          
          <Form className="d-flex mx-auto">
          <Input type="search" placeholder="Search" className="me-2" />
          <Button color="primary">Search</Button>
        </Form>
          
          <NavItem>
            <NavLink href="#">Login / Create Account</NavLink>
          </NavItem>
        </Nav>
        
      </Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
