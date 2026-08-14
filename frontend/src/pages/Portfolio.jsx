import React from 'react'
import '../styles/portfolio.css'

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce solution with advanced features and seamless user experience.',
      icon: '⚡',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'Mobile App',
      description: 'Secure and intuitive mobile banking application for financial institutions.',
      icon: '✦',
      tags: ['React Native', 'Firebase', 'Stripe']
    },
    {
      id: 3,
      title: 'Brand Identity System',
      category: 'Branding',
      description: 'Complete brand identity design including logo, guidelines, and visual assets.',
      icon: '◈',
      tags: ['Design', 'Branding', 'Identity']
    },
    {
      id: 4,
      title: 'SaaS Dashboard',
      category: 'Web Application',
      description: 'Analytics dashboard with real-time data visualization and reporting.',
      icon: '⌘',
      tags: ['Vue.js', 'D3.js', 'Python']
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'Web Development',
      description: 'Feature-rich social networking platform with real-time interactions.',
      icon: '✉',
      tags: ['Next.js', 'Socket.io', 'Redis']
    },
    {
      id: 6,
      title: 'AI-Powered Assistant',
      category: 'AI/ML',
      description: 'Intelligent virtual assistant with natural language processing capabilities.',
      icon: '♥',
      tags: ['Python', 'TensorFlow', 'NLP']
    }
  ]

  return (
    <div className="portfolio">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">Our Work</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Portfolio</span>
          </h1>
          <p className="page-description">
            Explore our collection of projects that showcase our expertise and passion for excellence.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-icon">{project.icon}</div>
              <div className="project-category">{project.category}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <button className="project-link">
                <span>View Project</span>
                <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
