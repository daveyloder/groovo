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
} from "reactstrap";

import { FaSearch, FaUser } from "react-icons/fa";
import { getSpotifyToken } from "../../services/spotifyService";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = () => setIsOpen(!isOpen);
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery) return;

    try {
      const token = await getSpotifyToken(); // Function to fetch token
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      console.log("Search Results:", data.tracks.items); // Display results or update state
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
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
              <NavLink className={styles.navLink} href="#">
                <FaUser className="me-1" />
                Login
              </NavLink>
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
