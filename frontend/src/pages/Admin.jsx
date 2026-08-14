import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure, updateOrderStatusStart, updateOrderStatusSuccess, updateOrderStatusFailure } from '../redux/slices/orderSlice'
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../redux/slices/productSlice'
import { ordersAPI, productsAPI, authAPI } from '../services/api'
import '../styles/admin.css'

const Admin = () => {
  const { user, token } = useSelector((state) => state.auth)
  const { orders } = useSelector((state) => state.orders)
  const { products } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])

  const fetchData = useCallback(async () => {
    // Fetch orders
    dispatch(fetchOrdersStart())
    try {
      const ordersData = await ordersAPI.getAllOrders(token)
      dispatch(fetchOrdersSuccess(ordersData))
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message))
    }

    // Fetch products
    dispatch(fetchProductsStart())
    try {
      const productsData = await productsAPI.getAll()
      dispatch(fetchProductsSuccess(productsData))
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }

    // Fetch users
    try {
      const usersData = await authAPI.getUsers(token)
      setUsers(usersData)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }, [token, dispatch])

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchData()
  }, [user, navigate, fetchData])

  const handleUpdateOrderStatus = async (orderId, status) => {
    dispatch(updateOrderStatusStart())
    try {
      const updatedOrder = await ordersAPI.updateStatus(orderId, status, token)
      dispatch(updateOrderStatusSuccess(updatedOrder))
    } catch (error) {
      dispatch(updateOrderStatusFailure(error.message))
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(productId, token)
        // Refresh products
        const productsData = await productsAPI.getAll()
        dispatch(fetchProductsSuccess(productsData))
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="admin">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">⌘</span>
            <span className="badge-text">Admin Dashboard</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Dashboard</span>
          </h1>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="tab-icon">⚡</span>
            <span>Dashboard</span>
          </button>
          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="tab-icon">◈</span>
            <span>Orders</span>
          </button>
          <button
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="tab-icon">✦</span>
            <span>Products</span>
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="tab-icon">✉</span>
            <span>Users</span>
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-number">{orders.length}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">◈</div>
                <div className="stat-info">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✦</div>
                <div className="stat-info">
                  <span className="stat-number">{users.length}</span>
                  <span className="stat-label">Users</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">♥</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {orders.filter(o => o.status === 'delivered').length}
                  </span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>

            <div className="recent-orders">
              <h2 className="section-title">Recent Orders</h2>
              <div className="orders-table">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="table-row">
                    <span className="row-cell">#{order._id.slice(-8)}</span>
                    <span className="row-cell">{order.user?.name || 'Unknown'}</span>
                    <span className="row-cell">₹{order.totalAmount}</span>
                    <span className={`row-cell status ${order.status}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-content">
            <h2 className="section-title">All Orders</h2>
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <span className="order-id">#{order._id.slice(-8)}</span>
                      <span className="order-user">{order.user?.name || 'Unknown'}</span>
                    </div>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-total">Total: ₹{order.totalAmount}</span>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-actions">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-content">
            <div className="section-header">
              <h2 className="section-title">Products</h2>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/admin/add-product')}
              >
                <span>Add Product</span>
                <span className="arrow">→</span>
              </button>
            </div>
            <div className="products-list">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    {product.imagesUrls && product.imagesUrls.length > 0 ? (
                      <img src={product.imagesUrls[0]} alt={product.name} />
                    ) : (
                      <div className="placeholder">⚡</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <span className="product-price">₹{product.price}</span>
                  </div>
                  <div className="product-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-content">
            <h2 className="section-title">Users</h2>
            <div className="users-table">
              {users.map((userItem) => (
                <div key={userItem._id} className="table-row">
                  <span className="row-cell">{userItem.name}</span>
                  <span className="row-cell">{userItem.email}</span>
                  <span className={`row-cell role ${userItem.role}`}>{userItem.role}</span>
                  <span className="row-cell">
                    {userItem.verified ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
