import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } from '../redux/slices/cartSlice'
import '../styles/cart.css'

const Cart = () => {
  const { items, total, coupon, couponDiscount } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  // Sample available coupons
  const availableCoupons = [
    { code: 'SAVE10', discount: 10, description: '10% off on orders above ₹500' },
    { code: 'SAVE20', discount: 20, description: '20% off on orders above ₹1000' },
    { code: 'FLAT50', discount: 50, description: 'Flat ₹50 off on orders above ₹300' }
  ]

  // Available offers
  const availableOffers = [
    { title: 'Free Delivery', description: 'On orders above ₹499', icon: '🚚' },
    { title: 'Extra 5% Off', description: 'On orders above ₹999', icon: '🎁' },
    { title: 'Cashback', description: 'Up to ₹100 on first order', icon: '💰' }
  ]

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = subtotal * (couponDiscount / 100)
  const deliveryThreshold = 499
  const deliveryProgress = Math.min((subtotal / deliveryThreshold) * 100, 100)
  const deliveryCharge = subtotal >= deliveryThreshold ? 0 : 49
  const finalTotal = total + deliveryCharge

  // Calculate total savings (from discounts)
  const totalSavings = discountAmount

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ product: productId, quantity }))
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  const handleApplyCoupon = () => {
    setCouponError('')
    setCouponSuccess('')

    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    const validCoupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase())

    if (validCoupon) {
      // Check minimum order requirements
      if (validCoupon.code === 'SAVE10' && subtotal < 500) {
        setCouponError('Minimum order value ₹500 required')
        return
      }
      if (validCoupon.code === 'SAVE20' && subtotal < 1000) {
        setCouponError('Minimum order value ₹1000 required')
        return
      }
      if (validCoupon.code === 'FLAT50' && subtotal < 300) {
        setCouponError('Minimum order value ₹300 required')
        return
      }

      dispatch(applyCoupon({ code: validCoupon.code, discount: validCoupon.discount }))
      setCouponSuccess(`Coupon applied: ${validCoupon.discount}% off`)
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon())
    setCouponSuccess('')
  }

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="page-glow"></div>
        <div className="page-container">
          <div className="page-header">
            <div className="page-badge">
              <span className="badge-icon">🛒</span>
              <span className="badge-text">Shopping Cart</span>
            </div>
            <h1 className="page-title">
              <span className="title-gradient">Your Cart</span>
            </h1>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <button className="btn btn-primary" onClick={() => navigate('/products')}>
                <span>Start Shopping</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">🛒</span>
            <span className="badge-text">Shopping Cart</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Your Cart</span>
            <span className="cart-count">({items.length} items)</span>
          </h1>
        </div>

        <div className="cart-content">
          <div className="cart-main">
            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="section-header">
                <h2 className="section-title">Cart Items ({items.length})</h2>
                <button className="btn btn-secondary continue-shopping-btn" onClick={() => navigate('/products')}>
                  <span>Continue Shopping</span>
                  <span className="arrow">→</span>
                </button>
              </div>

              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.product} className="cart-item">
                    <div className="item-image">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                      ) : (
                        <div className="placeholder">⚡</div>
                      )}
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-prices">
                        <span className="item-current-price">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <>
                            <span className="item-original-price">₹{item.originalPrice}</span>
                            <span className="item-discount">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="item-quantity">
                      <span className="qty-label">Qty:</span>
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => handleUpdateQuantity(item.product, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleUpdateQuantity(item.product, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-total">
                      <span className="total-label">Total:</span>
                      <span className="total-value">₹{item.price * item.quantity}</span>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.product)}
                      title="Remove item"
                    >
                      <span>🗑</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Offers */}
            <div className="offers-section">
              <h2 className="section-title">Available Offers</h2>
              <div className="offers-grid">
                {availableOffers.map((offer, index) => (
                  <div key={index} className="offer-card">
                    <div className="offer-icon">{offer.icon}</div>
                    <div className="offer-details">
                      <h3 className="offer-title">{offer.title}</h3>
                      <p className="offer-description">{offer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-section">
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>

              {/* Coupon Section */}
              <div className="coupon-section">
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button
                    className="btn btn-primary apply-coupon-btn"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
                {couponError && <div className="coupon-error">{couponError}</div>}
                {couponSuccess && <div className="coupon-success">{couponSuccess}</div>}

                {coupon && (
                  <div className="applied-coupon">
                    <span className="coupon-badge">
                      <span className="coupon-code">{coupon}</span>
                      <span className="coupon-discount">{couponDiscount}% OFF</span>
                    </span>
                    <button className="remove-coupon-btn" onClick={handleRemoveCoupon}>
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Free Delivery Progress */}
              <div className="delivery-progress-section">
                <div className="progress-header">
                  <span className="progress-label">
                    {subtotal >= deliveryThreshold ? '🎉 Free Delivery Applied!' : `Add ₹${(deliveryThreshold - subtotal).toFixed(0)} more for free delivery`}
                  </span>
                  <span className="progress-value">{Math.round(deliveryProgress)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${deliveryProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span className="breakdown-label">Subtotal</span>
                  <span className="breakdown-value">₹{subtotal.toFixed(2)}</span>
                </div>

                {coupon && (
                  <div className="breakdown-row discount">
                    <span className="breakdown-label">Discount ({coupon} {couponDiscount}%)</span>
                    <span className="breakdown-value">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="breakdown-row">
                  <span className="breakdown-label">Delivery</span>
                  <span className="breakdown-value">
                    {deliveryCharge === 0 ? (
                      <span className="free-delivery">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="breakdown-row savings">
                    <span className="breakdown-label">Total Savings</span>
                    <span className="breakdown-value">₹{totalSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="breakdown-divider"></div>

                <div className="breakdown-row total">
                  <span className="breakdown-label">Total</span>
                  <span className="breakdown-value">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                <span>Proceed to Checkout</span>
                <span className="arrow">→</span>
              </button>

              <button
                className="btn btn-secondary clear-cart-btn"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    dispatch(clearCart())
                  }
                }}
              >
                <span>Clear Cart</span>
              </button>

              {/* Security Badge */}
              <div className="security-badge">
                <span className="security-icon">🔒</span>
                <span className="security-text">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart