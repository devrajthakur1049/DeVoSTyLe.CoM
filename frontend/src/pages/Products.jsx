import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../redux/slices/productSlice'
import { productsAPI } from '../services/api'
import { addToCart } from '../redux/slices/cartSlice'
import '../styles/productscart.css'

const Products = () => {
  const { products, loading, error } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart())
      try {
        const data = await productsAPI.getAll()
        dispatch(fetchProductsSuccess(data))
      } catch (err) {
        dispatch(fetchProductsFailure(err.message))
      }
    }
    fetchProducts()
  }, [dispatch])

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imagesUrls && product.imagesUrls.length > 0 ? product.imagesUrls[0] : null
    }))
  }

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="products">
      <div className="page-glow"></div>
      <div className="page-container">
        <div className="page-header">
          <div className="page-badge">
            <span className="badge-icon">◈</span>
            <span className="badge-text">Our Products</span>
          </div>
          <h1 className="page-title">
            <span className="title-gradient">Shop Now</span>
          </h1>
        </div>

        <div className="products-grid">
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
                <p className="product-description">{product.description}</p>
                <p className="product-category">{product.category}</p>
                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <div className="product-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="empty-products">
            <span className="empty-icon">◈</span>
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
