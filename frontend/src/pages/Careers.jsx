import React from 'react'
import '../styles/careers.css'

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      icon: '⚡'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      icon: '◈'
    },
    {
      id: 3,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      icon: '✦'
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      icon: '⌘'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      icon: '✉'
    },
    {
      id: 6,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
      icon: '♥'
    }
  ]

  return (
    <div className="careers">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">Join Our Team</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Careers</span>
          </h1>
          <p className="page-description">
            Build the future with us. Join a team of passionate innovators shaping the digital landscape.
          </p>
        </div>

        <div className="benefits-section">
          <h2 className="section-title">Why Work With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3 className="benefit-title">Growth</h3>
              <p className="benefit-description">
                Continuous learning opportunities and career advancement paths.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">♥</div>
              <h3 className="benefit-title">Culture</h3>
              <p className="benefit-description">
                Inclusive and collaborative environment that values every voice.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✦</div>
              <h3 className="benefit-title">Flexibility</h3>
              <p className="benefit-description">
                Remote-first culture with flexible working arrangements.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⌘</div>
              <h3 className="benefit-title">Benefits</h3>
              <p className="benefit-description">
                Competitive compensation, health insurance, and perks.
              </p>
            </div>
          </div>
        </div>

        <div className="openings-section">
          <h2 className="section-title">Open Positions</h2>
          <div className="openings-grid">
            {jobOpenings.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-icon">{job.icon}</div>
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span className="job-department">{job.department}</span>
                    <span className="job-location">{job.location}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                </div>
                <button className="job-apply">
                  <span>Apply</span>
                  <span className="arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Careers
