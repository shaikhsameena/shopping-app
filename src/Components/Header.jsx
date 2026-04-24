import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./Header.css";

const Header = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [showHelpHint, setShowHelpHint] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const cartCount = useSelector((state) => state.cart.products.length);
  const wishlistCount = useSelector((state) => state.wishlist.products.length);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  const handleCartClick = () => {
    navigate("/buy");
  };

  const handleWishlistClick = () => {
    // Navigate to a wishlist page (you can create this page later)
    navigate("/wishlist");
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
            <img src={Logo} alt="logo" />
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
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />
              <i className="fas fa-search search-icon" />
            </div>

           
            <button
              className="icon-btn"
              title="Wishlist"
              onClick={handleWishlistClick}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}
            >
              <i className="fas fa-heart" style={{ color: wishlistCount > 0 ? "#ff6b6b" : "inherit" }} />
              {wishlistCount > 0 && (
                <span style={{ marginLeft: "4px", fontSize: "12px", color: "#ff6b6b" }}>
                  {wishlistCount}
                </span>
              )}
            </button>

           
            <button
              className="cart-icon"
              title="Cart"
              onClick={handleCartClick}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}
            >
              <i className="fas fa-shopping-cart" />
              {cartCount > 0 && (
                <span style={{ marginLeft: "4px", fontSize: "12px", color: "#ff6b6b" }}>
                  {cartCount}
                </span>
              )}
            </button>
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
            <img src={Logo} alt="logo" />
          </div>

          <div className="search-box ">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />
            <i className="fas fa-search search-icon" />
          </div>

          <div className="mobile-icons">
            <button
              title="Wishlist"
              onClick={handleWishlistClick}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}
            >
              <i className="fas fa-heart" style={{ color: wishlistCount > 0 ? "#ff6b6b" : "inherit" }} />
            </button>
            

            <button
              className="cart-icon"
              title="Cart"
              onClick={handleCartClick}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}
            >
              <i className="fas fa-shopping-cart" />
              {cartCount > 0 && (
                <span style={{ marginLeft: "4px", fontSize: "12px", color: "#ff6b6b" }}>
                  {cartCount}
                </span>
              )}
            </button>
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
