import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { productsAPI } from '../services/api'
import '../styles/product-details.css'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { products } = useSelector((state) => state.products)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showAddToCartFeedback, setShowAddToCartFeedback] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        // First check if product exists in Redux store
        const existingProduct = products.find(p => p._id === id)
        if (existingProduct) {
          setProduct(existingProduct)
          if (existingProduct.imagesUrls && existingProduct.imagesUrls.length > 0) {
            setSelectedImage(0)
          }
        } else {
          // If not in store, fetch from API
          const data = await productsAPI.getById(id)
          setProduct(data)
          if (data.imagesUrls && data.imagesUrls.length > 0) {
            setSelectedImage(0)
          }
        }
      } catch (err) {
        setError(err.message || 'Unable to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, products])

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      // Check stock if available
      if (product.stock && newQuantity > product.stock) {
        return
      }
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imagesUrls && product.imagesUrls.length > 0 ? product.imagesUrls[0] : null
    }))

    // Show feedback
    setShowAddToCartFeedback(true)
    setTimeout(() => setShowAddToCartFeedback(false), 2000)
  }

  const handleBuyNow = () => {
    if (!product) return

    // Add to cart first
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imagesUrls && product.imagesUrls.length > 0 ? product.imagesUrls[0] : null
    }))

    // Navigate to checkout
    if (!user) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (loading) {
    return (
      <div className="product-details">
        <div className="page-glow"></div>
        <div className="page-container">
          <div className="loading">Loading product...</div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-details">
        <div className="page-glow"></div>
        <div className="page-container">
          <div className="error-state">
            <span className="error-icon">◈</span>
            <h2>Product not found</h2>
            <p>{error || 'The product you are looking for does not exist.'}</p>
            <button className="btn btn-primary" onClick={() => navigate('/products')}>
              <span>Back to Products</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter(
    p => p.category === product.category && p._id !== product._id
  ).slice(0, 4)

  return (
    <div className="product-details">
      <div className="page-glow"></div>
      <div className="page-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/products">Products</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/products')}>
          <span className="arrow">←</span>
          <span>Back to Products</span>
        </button>

        {/* Product Details */}
        <div className="product-details-content">
          {/* Image Section */}
          <div className="product-image-section">
            <div className="main-image">
              {product.imagesUrls && product.imagesUrls.length > 0 ? (
                <img
                  src={product.imagesUrls[selectedImage]}
                  alt={product.name}
                  className="main-product-image"
                />
              ) : (
                <div className="placeholder">⚡</div>
              )}
            </div>

            {product.imagesUrls && product.imagesUrls.length > 1 && (
              <div className="thumbnail-gallery">
                {product.imagesUrls.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="product-info-section">
            <div className="product-category-badge">
              {product.category}
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="product-price-section">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="discount-badge">{product.discount}% OFF</span>
              )}
            </div>

            {product.rating && (
              <div className="product-rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                <span className="rating-value">{product.rating}</span>
                {product.reviews && (
                  <span className="reviews-count">({product.reviews} reviews)</span>
                )}
              </div>
            )}

            <p className="product-description">{product.description}</p>

            {product.brand && (
              <div className="product-brand">
                <span className="label">Brand:</span>
                <span className="value">{product.brand}</span>
              </div>
            )}

            {product.stock !== undefined && (
              <div className="product-stock">
                <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={product.stock && quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className="btn btn-primary add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <span>{showAddToCartFeedback ? '✓ Added to Cart' : 'Add to Cart'}</span>
              </button>
              <button
                className="btn btn-secondary buy-now-btn"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <span>Buy Now</span>
                <span className="arrow">→</span>
              </button>
            </div>

            {/* Additional Info */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <div className="product-attributes">
                <h3>Specifications</h3>
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="attribute-item">
                    <span className="attribute-key">{key}:</span>
                    <span className="attribute-value">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="related-product-card">
                  <div className="related-product-image">
                    {relatedProduct.imagesUrls && relatedProduct.imagesUrls.length > 0 ? (
                      <img src={relatedProduct.imagesUrls[0]} alt={relatedProduct.name} />
                    ) : (
                      <div className="placeholder">⚡</div>
                    )}
                  </div>
                  <div className="related-product-info">
                    <h3 className="related-product-name">{relatedProduct.name}</h3>
                    <span className="related-product-price">₹{relatedProduct.price}</span>
                    <button
                      className="btn btn-secondary view-details-btn"
                      onClick={() => navigate(`/products/${relatedProduct._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails