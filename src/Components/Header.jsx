import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const DisabledIcon = ({ className = "", title = "", children }) => (
  <span
    className={`icon-btn disabled-icon ${className}`}
    title={title}
    aria-disabled="true"
    tabIndex={-1}
  >
    {children}
  </span>
);



const Header = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [showHelpHint, setShowHelpHint] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchInput] = useState("");

  const cartCount = useSelector((state) => state.cart.products.length);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const onScroll = () => setShowScrollBtn(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const underline = document.getElementById("underline");
    const activeLink = document.querySelector(".nav-link.active");
    if (underline && activeLink) {
      underline.style.width = `${activeLink.offsetWidth}px`;
      underline.style.left = `${activeLink.offsetLeft}px`;
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMobileNavOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHelpHint(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setIsMobileNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const openWhatsApp = () => window.open("https://wa.me/8310746852", "_blank");
  const openChat = () => alert("Chat coming soon!");

  const items = [
    { to: "/", label: "Home" },
    { to: "/service", label: "Service" },
    { to: "/product", label: "Products" },
    { to: "/support", label: "Supports" },
    { to: "/contact", label: "Contact" },
    { to: "/buy", label: "Buy" },
  ];

  return (
    <>
     
      <div className="sticky-wrapper desktop-header">
        <header className="main-header">
          <div className="logo" onClick={handleLogoClick}>
            <img src="src/assets/logo.png" alt="logo" />
          </div>

          <nav className="nav-links">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {it.label}
              </NavLink>
            ))}
            <div id="underline" className="underline" />
          </nav>

          <div className="header-right">
            
            <div className="search-box">
              <input
                type="text"
                placeholder="Search disabled"
                value={searchInput}
                onChange={() => {}}
                onKeyDown={(e) => e.preventDefault()}
                disabled
              />
              <i className="fas fa-search search-icon" />
            </div>

           
            <DisabledIcon title="Wishlist (disabled)">
              <i className="fas fa-heart" />
            </DisabledIcon>

           
            <DisabledIcon className="cart-icon" title="Cart (disabled)">
              <i className="fas fa-shopping-cart" />
            </DisabledIcon>
          </div>
        </header>
      </div>

     
      <div className="mobile-header">
        <div className="mobile-header-top">
          <button
            type="button"
            className={`hamburger-btn ${isMobileNavOpen ? "open" : ""}`}
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsMobileNavOpen((p) => !p)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="logo" onClick={handleLogoClick}>
            <img src="src/assets/logo.png" alt="logo" />
          </div>

          <div className="search-box ">
            <input
              type="text"
              placeholder="Search disabled"
              value={searchInput}
              onChange={() => {}}
              onKeyDown={(e) => e.preventDefault()}
              
            />
            <i className="fas fa-search search-icon" />
          </div>

          <div className="mobile-icons">
            <div title="Wishlist (disabled)">
              <i className="fas fa-heart" />
              </div>
            

            <DisabledIcon className="cart-icon" title="Cart (disabled)">
              <i className="fas fa-shopping-cart" />
            
            </DisabledIcon>
          </div>
        </div>

        <div
          id="mobile-drawer"
          className={`mobile-drawer ${isMobileNavOpen ? "open" : ""}`}
          aria-hidden={!isMobileNavOpen}
        >
          <button
            type="button"
            className="drawer-backdrop"
            aria-label="Close menu"
            onClick={() => setIsMobileNavOpen(false)}
          />

          <div
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="drawer-header">
              <strong>Menu</strong>
              <button
                type="button"
                className="drawer-close"
                aria-label="Close menu"
                onClick={() => setIsMobileNavOpen(false)}
              >
                &times;
              </button>
            </div>

            <nav className="drawer-nav">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {it.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      
      {showScrollBtn && showHelpHint && (
        <div className="help-hint-box">
          <span>💬 Need help? Chat or WhatsApp us!</span>
          <button
            className="close-hint"
            onClick={() => setShowHelpHint(false)}
          >
            &times;
          </button>
        </div>
      )}

     
      {showScrollBtn && (
        <div className="floating-button-group">
          <button
            type="button"
            className="floating-btn scroll-btn"
            onClick={scrollToTop}
            title="Scroll to Top"
          >
            <i className="fas fa-arrow-up" />
          </button>
          <button
            type="button"
            className="floating-btn whatsapp-btn"
            onClick={openWhatsApp}
            title="Chat on WhatsApp"
          >
            <i className="fab fa-whatsapp" />
          </button>
          <button
            type="button"
            className="floating-btn chat-btn"
            onClick={openChat}
            title="Live Chat"
          >
            💬
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
