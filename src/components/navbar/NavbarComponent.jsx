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
  Button,
  Input,
  InputGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { FaSearch, FaUser } from "react-icons/fa";

import { getSpotifyToken } from "../../services/spotifyService";

import LoginComponent from "../login/LoginComponent";

function NavbarComponent({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Navbar expand="lg" className={`px-3 ${styles.navbar}`} dark>
      <NavbarBrand href="/" className={`fw-bold ${styles.brand}`}>
        Groovo
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className={styles.toggler} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className={`w-100 ${styles.navContainer}`} navbar>
          <Form
            className={`mx-auto ${styles.searchForm}`}
            onSubmit={handleSearch}
          >
            <InputGroup>
              <Input
                aria-describedby="searchbutton"
                type="text"
                placeholder="Search for music, artists..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <Button
                type="submit"
                className={styles.searchButton}
                color="primary"
              >
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
          <div className={`d-flex ${styles.authLinks}`}>
            <NavItem>
              <NavLink
                className={styles.navLink}
                href="#"
                onClick={toggleModal}
              >
                <FaUser className="me-1" />
                Login
              </NavLink>

              <Modal isOpen={modal} toggle={toggleModal}>
                <LoginComponent />
              </Modal>
            </NavItem>
            <NavItem>
              <NavLink className={styles.navLink} href="/">
                Create Account
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
