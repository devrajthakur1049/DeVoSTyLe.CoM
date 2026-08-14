import React from 'react'
import '../styles/blog.css'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging technologies and trends that will shape the digital landscape in the coming years.',
      date: 'Dec 15, 2024',
      category: 'Technology',
      icon: '⚡'
    },
    {
      id: 2,
      title: 'Design Principles for Modern UI',
      excerpt: 'Essential design principles that create intuitive and beautiful user interfaces.',
      date: 'Dec 10, 2024',
      category: 'Design',
      icon: '◈'
    },
    {
      id: 3,
      title: 'Optimizing Performance',
      excerpt: 'Strategies and techniques to make your web applications lightning fast.',
      date: 'Dec 5, 2024',
      category: 'Performance',
      icon: '✦'
    },
    {
      id: 4,
      title: 'Building Scalable Applications',
      excerpt: 'Best practices for creating applications that grow with your business.',
      date: 'Nov 28, 2024',
      category: 'Development',
      icon: '⌘'
    },
    {
      id: 5,
      title: 'The Art of User Experience',
      excerpt: 'Creating memorable experiences that keep users coming back.',
      date: 'Nov 20, 2024',
      category: 'UX',
      icon: '♥'
    },
    {
      id: 6,
      title: 'Mobile-First Development',
      excerpt: 'Why and how to prioritize mobile in your development strategy.',
      date: 'Nov 15, 2024',
      category: 'Mobile',
      icon: '✉'
    }
  ]

  return (
    <div className="blog">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">Our Blog</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Latest Insights</span>
          </h1>
          <p className="page-description">
            Stay updated with the latest trends, tips, and insights from our team of experts.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-icon">{post.icon}</div>
              <div className="blog-meta">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <button className="blog-link">
                <span>Read More</span>
                <span className="arrow">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
