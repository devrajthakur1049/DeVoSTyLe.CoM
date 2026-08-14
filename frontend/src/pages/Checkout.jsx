import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrderStart, createOrderSuccess, createOrderFailure } from '../redux/slices/orderSlice'
import { clearCart } from '../redux/slices/cartSlice'
import { ordersAPI } from '../services/api'
import '../styles/checkout.css'

const Checkout = () => {
  const { items, total } = useSelector((state) => state.cart)
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit_card'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    const orderItems = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price
    }))

    const orderData = {
      orderItems,
      shippingAddress: formData,
      paymentMethod: formData.paymentMethod,
      totalPrice: total
    }

    dispatch(createOrderStart())
    
    try {
      const response = await ordersAPI.create(orderData, token)
      dispatch(createOrderSuccess(response))
      dispatch(clearCart())
      navigate('/profile')
    } catch (error) {
      dispatch(createOrderFailure(error.message))
      alert('Failed to create order. Please try again.')
    }
  }

  if (!user) {
    return (
      <div className="checkout">
        <div className="page-container">
          <div className="auth-required">
            <span className="icon">✉</span>
            <h2>Please Login to Checkout</h2>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              <span>Login</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="checkout">
        <div className="page-container">
          <div className="empty-cart">
            <span className="empty-icon">◈</span>
            <p>Your cart is empty</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>
              <span>Continue Shopping</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Checkout</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Complete Your Order</span>
          </h1>
        </div>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="section-title">Shipping Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="street">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="123 Main St"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="San Francisco"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="94102"
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <span className="icon">⚡</span>
                    <span>Credit Card</span>
                  </span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <span className="icon">◈</span>
                    <span>PayPal</span>
                  </span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleChange}
                  />
                  <span className="payment-label">
                    <span className="icon">✦</span>
                    <span>Cash on Delivery</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Order Summary</h2>
              <div className="order-summary">
                {items.map((item) => (
                  <div key={item.product} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              <span>Place Order</span>
              <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
