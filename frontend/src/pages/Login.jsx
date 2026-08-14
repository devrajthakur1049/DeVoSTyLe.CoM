import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice'
import { authAPI } from '../services/api'
import '../styles/auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    dispatch(loginStart())

    try {
      const response = await authAPI.login(formData)
      console.log('Login response:', response)

      if (response.token) {
        dispatch(loginSuccess({
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
        dispatch(loginFailure(response.message || 'Login failed'))
      }
    } catch (error) {
      console.error('Login error:', error)
      dispatch(loginFailure('Server error. Please try again.'))
    }
  }

  return (
    <div className="auth">
      <div className="page-glow"></div>
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <div className="auth-badge">
              <span className="badge-icon">✉</span>
              <span className="badge-text">Welcome Back</span>
            </div>
            <h1 className="auth-title">
              <span className="title-gradient">Login</span>
            </h1>
            <p className="auth-description">
              Sign in to access your account and continue shopping.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <span className="btn-text">{loading ? 'Signing In...' : 'Sign In'}</span>
              <span className="btn-icon">→</span>
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
