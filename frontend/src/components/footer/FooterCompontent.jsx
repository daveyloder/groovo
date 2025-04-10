import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={`w-100 bg-light text-muted mt-auto`}>
      <footer className="site-footer text-center text-lg-start w-100">
        {/* Section: Social Media  */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4">
          <div className="me-5 d-none d-lg-block">
            <span>Connect with us on social media!</span>
          </div>
          <div>
            <a href="https://www.facebook.com" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.twitter.com" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
          </div>

        </section>

        {/* Section: Links */}
        <section className="px-5">
          <div className="row mt-3">
            <div className="col-md-4 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">GROOVO</h6>
              <p>
                Groovo is a web-based app that can search songs on Spotify,
                display lyrics, save your favorite songs, and more!
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Links</h6>
              <p>
                <Link
                  className="text-reset text-decoration-none"
                  to="/login"
                >
                  Login
                </Link>
              </p>
              <p>
                <Link
                  className="text-reset text-decoration-none"
                  to="/createaccount"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="bi bi-house-fill">
                  <i className="fas fa-house me-3"></i></i> 1801 N Broad St,
                Philadelphia, PA
              </p>
              <p>
                <i class="bi bi-envelope-fill"></i>
                <i className="fas fa-envelope me-3"></i> groovo@gmail.com
              </p>
              <p>
                <i class="bi bi-telephone-fill">
                  <i className="fas fa-phone me-3"></i></i> +1 (609) 234-5678
              </p>
            </div>
          </div>
        </section>

        <div
          id="copywright"
          className="text-center p-4  "
          style={{ backgroundColor: "#f28749" }}
        >
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="/" className="text-reset fw-bold text-decoration-none">
            groovo.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
