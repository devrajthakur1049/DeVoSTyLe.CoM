import React from 'react'
import "../styles/productscart.css"


const Productscart = (products) => {
  return (
    <div className="product-cart">
      <img src={products.imageUrl} alt={products.name} className="product-image" />
      <div className="product-info">
        <div className="product-details">
          <h1>{products.name}</h1>
          <p>{products.price}</p>
          <p>{products.quantity}</p>
          <button>Remove</button>
        </div>

      </div>

    </div>
  )
}

export default Productscart