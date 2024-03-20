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
import Logo from "../../../images/logo.png"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Use useNavigate hook
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
              src={Logo}
              alt="Logo"
            />
          </div>

          <div className="content">
            <div className="links-and-icons">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="nav-link" onClick={() => { navigate("/"); closeNavbar(); }}>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => { navigate("/products"); closeNavbar(); }}>
                    Products
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => { navigate("/contact"); closeNavbar(); }}>
                    Contact
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => { navigate("/about"); closeNavbar(); }}>
                    About
                  </button>
                </li>
              </ul>

              <div className="icons">
                <div className="icon-wrapper">
                  <button className="nav-link" onClick={() => { navigate(isAuthenticated ? "/account" : "/login"); closeNavbar(); }}>
                    <FontAwesomeIcon
                      icon={faUser}
                      size="lg"
                      className="black-icon"
                    />
                  </button>
                </div>
                <div className="icon-wrapper">
                  <button className="nav-link" onClick={() => { navigate("/cart"); closeNavbar(); }}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      size="lg"
                      className="black-icon"
                    />
                  </button>
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

