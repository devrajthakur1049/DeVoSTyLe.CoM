import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerStart, registerSuccess, registerFailure } from '../redux/slices/authSlice'
import { authAPI } from '../services/api'
import '../styles/auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure('Passwords do not match'))
      return
    }

    dispatch(registerStart())

    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      if (response.token) {
        dispatch(registerSuccess({
          user: {
            _id: response._id,
            name: response.name,
            email: response.email,
            role: response.role
          },
          token: response.token
        }))
        navigate('/')
      } else {
        dispatch(registerFailure(response.message || 'Registration failed'))
      }
    } catch (error) {
      console.error('Register error:', error)
      dispatch(registerFailure('Server error. Please try again.'))
    }
  }

  return (
    <div className="auth">
      <div className="page-glow"></div>
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <div className="auth-badge">
              <span className="badge-icon">✦</span>
              <span className="badge-text">Join Us</span>
            </div>
            <h1 className="auth-title">
              <span className="title-gradient">Register</span>
            </h1>
            <p className="auth-description">
              Create your account and start shopping with us today.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <span className="btn-text">{loading ? 'Creating Account...' : 'Create Account'}</span>
              <span className="btn-icon">→</span>
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
