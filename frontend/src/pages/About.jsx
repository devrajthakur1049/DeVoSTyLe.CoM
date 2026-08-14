import React from 'react'
import '../styles/about.css'

const About = () => {
  return (
    <div className="about">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">◈</span>
            <span className="badge-text">About Us</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Our Story</span>
          </h1>
          <p className="page-description">
            Discover the journey, vision, and values that drive us to create exceptional digital experiences.
          </p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2 className="section-title">Who We Are</h2>
            <div className="section-content">
              <p className="section-text">
                We are a team of passionate designers, developers, and innovators dedicated to crafting 
                digital experiences that inspire and transform. With years of experience across various 
                industries, we bring a unique perspective to every project we undertake.
              </p>
              <p className="section-text">
                Our mission is to bridge the gap between creativity and technology, delivering solutions 
                that not only look stunning but also perform exceptionally. We believe in the power of 
                design to change the world, one pixel at a time.
              </p>
            </div>
          </div>

          <div className="about-section">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">✦</div>
                <h3 className="value-title">Excellence</h3>
                <p className="value-description">
                  We strive for perfection in every detail, ensuring quality that exceeds expectations.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">⚡</div>
                <h3 className="value-title">Innovation</h3>
                <p className="value-description">
                  We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">♥</div>
                <h3 className="value-title">Passion</h3>
                <p className="value-description">
                  Our love for what we do drives us to create meaningful and impactful digital experiences.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">⌘</div>
                <h3 className="value-title">Integrity</h3>
                <p className="value-description">
                  We believe in transparency, honesty, and building lasting relationships with our clients.
                </p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="section-title">Our Journey</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2019</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Founded</h3>
                  <p className="timeline-description">
                    Started as a small design studio with a big vision to transform digital experiences.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2021</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Expansion</h3>
                  <p className="timeline-description">
                    Grew our team and expanded services to include full-stack development.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2023</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Global Reach</h3>
                  <p className="timeline-description">
                    Started serving clients internationally, establishing our global presence.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2024</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">Innovation Hub</h3>
                  <p className="timeline-description">
                    Launched our R&D division to explore emerging technologies and trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
