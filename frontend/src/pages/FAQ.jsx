import React, { useState } from 'react'
import '../styles/faq.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'What services do you offer?',
      answer: 'We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, e-commerce solutions, digital marketing, and brand identity design. Our team specializes in creating custom solutions tailored to your specific needs.',
      icon: '⚡'
    },
    {
      id: 2,
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on the scope and complexity. A simple website might take 4-6 weeks, while more complex applications can take 3-6 months. During our initial consultation, we provide a detailed timeline based on your specific requirements.',
      icon: '◈'
    },
    {
      id: 3,
      question: 'What is your pricing structure?',
      answer: 'We offer flexible pricing models including fixed-price projects and hourly rates. After understanding your requirements, we provide a detailed quote with transparent pricing. We believe in fair pricing that reflects the value and quality of our work.',
      icon: '✦'
    },
    {
      id: 4,
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive support and maintenance packages to ensure your digital products continue to perform optimally. Our support includes bug fixes, security updates, feature enhancements, and technical assistance.',
      icon: '⌘'
    },
    {
      id: 5,
      question: 'Can you work with our existing team?',
      answer: 'Absolutely! We have extensive experience collaborating with in-house teams. Whether you need us to lead a project, supplement your team, or provide specific expertise, we adapt our approach to integrate seamlessly with your workflow.',
      icon: '✉'
    },
    {
      id: 6,
      question: 'What technologies do you specialize in?',
      answer: 'We specialize in modern web technologies including React, Vue.js, Node.js, Python, and various cloud platforms. For mobile development, we work with React Native and Flutter. Our team stays updated with the latest technologies to deliver cutting-edge solutions.',
      icon: '♥'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">?</span>
            <span className="badge-text">FAQ</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Frequently Asked Questions</span>
          </h1>
          <p className="page-description">
            Find answers to common questions about our services, process, and partnership.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <div className="faq-icon">{faq.icon}</div>
                <h3 className="question-text">{faq.question}</h3>
                <div className="faq-toggle">
                  <span className="toggle-icon">{openIndex === index ? '−' : '+'}</span>
                </div>
              </div>
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p className="answer-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-cta">
          <h2 className="cta-title">Still have questions?</h2>
          <p className="cta-description">
            Can't find the answer you're looking for? Please reach out to our team directly.
          </p>
          <button className="btn btn-primary">
            <span className="btn-text">Contact Us</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FAQ
