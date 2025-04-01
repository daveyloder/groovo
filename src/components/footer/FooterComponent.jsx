import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <div className="w-100 bg-light text-muted mt-auto">
      <footer className="site-footer text-center text-lg-start w-100">
        {/* Section: Social Media  */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Connect with us on social media!</span>
          </div>
          <div>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-twitter" />
            </a>
            <a href="#" className="me-4 text-reset">
              <i className="fab fa-instagram" />
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
              <p><Link className="text-reset text-decoration-none" to="/">Home</Link></p>
              <p><Link className="text-reset text-decoration-none" to="/services">Services</Link></p>
              <p><Link className="text-reset text-decoration-none" to="/contactus">Contact Us</Link></p>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-house me-3"></i> 1801 N Broad St, Philadelphia, PA</p>
              <p><i className="fas fa-envelope me-3"></i> groovo@example.com</p>
              <p><i className="fas fa-phone me-3"></i> +1 (609) 234-5678</p>
            </div>
          </div>
        </section>

        <div className="text-center p-4 bg-light border-top">
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