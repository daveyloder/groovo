// Navbar.jsx
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button,
  Form,
  FormGroup,
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
    setSearch("");
  };

  return (
    <Navbar color="dark" dark expand="md" className="px-3">
      <NavbarBrand href="/">My Website</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact</NavLink>
          </NavItem>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormGroup className="mb-0 me-2">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Search
          </Button>
        </Form>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
