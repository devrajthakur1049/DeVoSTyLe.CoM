import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-icon">✦</span>
                            <span className="logo-text">DeVoSTyLe</span>
                        </Link>
                        <p className="footer-tagline">Crafting digital experiences that inspire</p>
                        <div className="footer-social">
                            <button className="social-link" aria-label="Twitter">
                                <span className="social-icon">𝕏</span>
                            </button>
                            <button className="social-link" aria-label="GitHub">
                                <span className="social-icon">⌘</span>
                            </button>
                            <button className="social-link" aria-label="LinkedIn">
                                <span className="social-icon">in</span>
                            </button>
                            <button className="social-link" aria-label="Instagram">
                                <span className="social-icon">◎</span>
                            </button>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <h3 className="footer-section-title">Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-section">
                        <h3 className="footer-section-title">Resources</h3>
                        <ul className="footer-links">
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/portfolio">Portfolio</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-section">
                        <h3 className="footer-section-title">Contact</h3>
                        <ul className="footer-links">
                            <li><span className="contact-icon">✉</span> hello@devostyle.com</li>
                            <li><span className="contact-icon">⌖</span> San Francisco, CA</li>
                            <li><span className="contact-icon">⌕</span> +1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-line"></div>
                    <p className="footer-copyright">
                        © 2024 DeVoSTyLe. All rights reserved. Crafted with <span className="heart">♥</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer