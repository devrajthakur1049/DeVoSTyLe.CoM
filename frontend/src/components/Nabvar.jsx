import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import '../styles/nabvar.css';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Nabvar = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <span className="logo-d">D</span>
              <span className="logo-s">S</span>
            </div>
            <span className="logo-text">DeVoStyle</span>
          </Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''} onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className={isActive('/products') ? 'active' : ''} onClick={handleLinkClick}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/services" className={isActive('/services') ? 'active' : ''} onClick={handleLinkClick}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className={isActive('/blog') ? 'active' : ''} onClick={handleLinkClick}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <Link to="/cart" className="cart-link" onClick={handleLinkClick}>
              <span className="cart-icon">🛒</span>
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="profile-link" onClick={handleLinkClick}>
                  <span className="profile-icon">👤</span>
                  <span className="profile-name">{user.name}</span>
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className={`admin-link ${isActive('/admin') ? 'active' : ''}`} onClick={handleLinkClick}>
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-link" onClick={handleLinkClick}>
                  Login
                </Link>
                <Link to="/register" className="auth-link auth-link-primary" onClick={handleLinkClick}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nabvar;
