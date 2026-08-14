import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../redux/slices/productSlice'
import { productsAPI } from '../services/api'
import { addToCart } from '../redux/slices/cartSlice'
import '../styles/home.css'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.products)
    const [featuredProducts, setFeaturedProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(fetchProductsStart())
            try {
                const data = await productsAPI.getAll()
                dispatch(fetchProductsSuccess(data))
                setFeaturedProducts(data.slice(0, 6))
            } catch (err) {
                dispatch(fetchProductsFailure(err.message))
            }
        }
        fetchProducts()
    }, [dispatch, navigate])

    const handleAddToCart = (product) => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imagesUrls && product.imagesUrls.length > 0 ? product.imagesUrls[0] : null
        }))
    }

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to <span className="brand-name">DeVoStyle</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover premium products that elevate your lifestyle
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate('/products')}>
                            Shop Now
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/about')}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose Us</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🚀</div>
                            <h3>Fast Delivery</h3>
                            <p>Get your orders delivered quickly and safely</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💎</div>
                            <h3>Premium Quality</h3>
                            <p>Only the best products for our customers</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Payments</h3>
                            <p>Your transactions are always protected</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💬</div>
                            <h3>24/7 Support</h3>
                            <p>We're here to help you anytime</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <button className="btn btn-outline" onClick={() => navigate('/products')}>
                            View All Products →
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading">Loading products...</div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map((product) => (
                                <div key={product._id} className="product-card">
                                    <div className="product-image">
                                        {product.imagesUrls && product.imagesUrls.length > 0 ? (
                                            <img src={product.imagesUrls[0]} alt={product.name} />
                                        ) : (
                                            <div className="placeholder">📦</div>
                                        )}
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-category">{product.category}</p>
                                        <div className="product-footer">
                                            <span className="product-price">₹{product.price}</span>
                                            <div className="product-actions">
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
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
                    )}

                    {featuredProducts.length === 0 && !loading && (
                        <div className="empty-state">
                            <p>No products available yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Start Shopping?</h2>
                        <p>Join thousands of satisfied customers and discover amazing products</p>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>
                            Browse Products
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home