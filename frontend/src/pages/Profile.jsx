import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } from '../redux/slices/orderSlice'
import { ordersAPI } from '../services/api'
import '../styles/profile.css'

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth)
  const { orders, loading } = useSelector((state) => state.orders)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchOrders = async () => {
      dispatch(fetchOrdersStart())
      try {
        const data = await ordersAPI.getMyOrders(token)
        dispatch(fetchOrdersSuccess(data))
      } catch (error) {
        dispatch(fetchOrdersFailure(error.message))
      }
    }
    fetchOrders()
  }, [user, token, dispatch, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!user) {
    return null
  }

  return (
    <div className="profile">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">My Profile</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Welcome, {user.name}</span>
          </h1>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <span className="avatar-icon">⌘</span>
              </div>
              <div className="profile-info">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{user.role === 'admin' ? 'Admin' : 'User'}</span>
                <span className="stat-label">Role</span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <span>Logout</span>
              <span className="icon">✉</span>
            </button>
          </div>

          <div className="orders-section">
            <h2 className="section-title">Order History</h2>
            {loading ? (
              <div className="loading">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="empty-orders">
                <span className="empty-icon">◈</span>
                <p>No orders yet</p>
                <button className="btn btn-primary" onClick={() => navigate('/products')}>
                  <span>Start Shopping</span>
                  <span className="arrow">→</span>
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <span className="label">Order ID:</span>
                        <span className="value">#{order._id.slice(-8)}</span>
                      </div>
                      <span className={`order-status ${order.status}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.product?.name || 'Product'}</span>
                          <span className="item-qty">x{item.quantity}</span>
                          <span className="item-price">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-date">
                        <span className="label">Date:</span>
                        <span className="value">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="order-total">
                        <span className="label">Total:</span>
                        <span className="value">₹{order.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
