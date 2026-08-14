import React from 'react'
import '../styles/services.css'

const Services = () => {
  return (
    <div className="services">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Our Services</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">What We Do</span>
          </h1>
          <p className="page-description">
            Comprehensive digital solutions tailored to elevate your business and captivate your audience.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">⌘</div>
            <h3 className="service-title">Web Development</h3>
            <p className="service-description">
              Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.
            </p>
            <ul className="service-features">
              <li>Responsive Design</li>
              <li>Modern Frameworks</li>
              <li>SEO Optimized</li>
              <li>Fast Performance</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">◈</div>
            <h3 className="service-title">UI/UX Design</h3>
            <p className="service-description">
              Beautiful and intuitive interfaces that enhance user engagement and drive conversions through thoughtful design.
            </p>
            <ul className="service-features">
              <li>User Research</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>Design Systems</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">✦</div>
            <h3 className="service-title">Mobile Apps</h3>
            <p className="service-description">
              Native and cross-platform mobile applications that deliver seamless experiences across all devices.
            </p>
            <ul className="service-features">
              <li>iOS & Android</li>
              <li>Cross-Platform</li>
              <li>App Store Optimization</li>
              <li>Push Notifications</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3 className="service-title">E-Commerce</h3>
            <p className="service-description">
              Powerful online stores that drive sales and provide exceptional shopping experiences for your customers.
            </p>
            <ul className="service-features">
              <li>Payment Integration</li>
              <li>Inventory Management</li>
              <li>Analytics Dashboard</li>
              <li>Multi-language Support</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">✉</div>
            <h3 className="service-title">Digital Marketing</h3>
            <p className="service-description">
              Strategic marketing solutions that increase visibility, engagement, and conversions across digital channels.
            </p>
            <ul className="service-features">
              <li>SEO & SEM</li>
              <li>Social Media</li>
              <li>Email Marketing</li>
              <li>Content Strategy</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">♥</div>
            <h3 className="service-title">Brand Identity</h3>
            <p className="service-description">
              Comprehensive branding solutions that establish your unique identity and resonate with your target audience.
            </p>
            <ul className="service-features">
              <li>Logo Design</li>
              <li>Brand Guidelines</li>
              <li>Visual Identity</li>
              <li>Brand Strategy</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h2 className="cta-title">Ready to Start Your Project?</h2>
          <p className="cta-description">
            Let's collaborate to bring your vision to life with our expertise and passion.
          </p>
          <button className="btn btn-primary">
            <span className="btn-text">Get a Quote</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services
