import React, { useState, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
// import Logo from "../../../images/logo.png"

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("navbarOpen") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("navbarOpen", isOpen);
  }, [isOpen]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <div className={`header ${isOpen ? "active" : ""}`}>
      <div className="hamburger-icon" onClick={toggleNavbar}>
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" />
        )}
      </div>

      <div
        className={`overlay-navbar ${isOpen ? "active" : ""} custom-overlay`}
      >
        <div className="overlay-content">
          <div className="logo">
            <img
              src={""}
              alt="Logo"
            />
          </div>

          <div className="content">
            <div className="links-and-icons">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={closeNavbar}>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/products"
                    className="nav-link"
                    onClick={closeNavbar}
                  >
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/contact" className="nav-link" onClick={closeNavbar}>
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/about" className="nav-link" onClick={closeNavbar}>
                    About
                  </a>
                </li>
              </ul>

              <div className="icons">
                <div className="icon-wrapper">
                  <a href="/search" onClick={closeNavbar}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      size="lg"
                      className="black-icon"
                    />
                  </a>
                </div>
                <div className="icon-wrapper">
                  <a
                    href={isAuthenticated ? "./account" : "./login"}
                    onClick={closeNavbar}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      size="lg"
                      className="black-icon"
                    />
                  </a>
                </div>
                <div className="icon-wrapper">
                  <a href="/cart" onClick={closeNavbar}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size="lg"
                      className="black-icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
