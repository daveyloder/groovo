import React, { useState } from "react";
import styles from "./navbar.module.css";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Input,
  InputGroup,
  Form,
  Modal,
  ModalBody,
} from "reactstrap";

import { FaSearch, FaUser } from "react-icons/fa";

import AccountComponent from "../account/AccountComponent"; // Import AccountComponent

function NavbarComponent({ onSearch, onLogin, loggedInUsername, onLogout }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);

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
          {loggedInUsername ? (
            <NavItem>
              <NavLink className={styles.navLink} href="#" onClick={onLogout}>
                Logout ({loggedInUsername})
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <NavLink
                className={styles.navLink}
                href="#"
                onClick={toggleModal}
              >
                <FaUser className="me-1" />
                Login/Create Account
              </NavLink>

              <Modal isOpen={modal} toggle={toggleModal}>
                <ModalBody>
                  <AccountComponent toggle={toggleModal} onLogin={onLogin} />
                </ModalBody>
              </Modal>
            </NavItem>
          )}
        </div>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
