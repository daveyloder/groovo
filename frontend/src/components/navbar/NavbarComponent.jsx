import React, { useState } from "react";
import styles from "./navbar.module.css";

import {
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

import AccountComponent from "../account/AccountComponent";

function NavbarComponent({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal_login, setModal_login] = useState(false);
  
  const [modal_account, setModal_account] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal_login = () => setModal_login(!modal_login);
  const toggleModal_account = () => setModal_account(!modal_account);

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(searchQuery); 
  };

  return (
    <Navbar expand="lg" className={`px-3 ${styles.navbar}`} dark>
      <NavbarBrand href="/" className={`fw-bold ${styles.brand}`}>
        Groovo
      </NavbarBrand>

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
            <NavLink id="display-blank" className={styles.navLink} href="#" onClick={toggleModal_login}>
              <FaUser className="me-1" />
              Login
            </NavLink>
            <Modal isOpen={modal_login} toggle={toggleModal_login}>
              <LoginComponent />
            </Modal>
          </NavItem>
          <NavItem>
            <NavLink id="display-account" className={styles.navLink} href="#" onClick={toggleModal_account}>
              <FaUser className="me-1" />
              Create Account
            </NavLink>
            <Modal isOpen={modal_account} toggle={toggleModal_account}>
              <AccountComponent />
            </Modal>
          </NavItem>
        </div>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
