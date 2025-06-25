import React from "react";
import { useState, useEffect } from "react";
import data from '../data/data.json'
import './card.css'

const Card = ({ item, quantity, onAddToCart, onRemoveFromCart }) => {
  const { image, name, category, price } = item;

  const handleAddToCart = () => {
    onAddToCart(item);
  };

  const handleIncrement = () => {
    onAddToCart(item);
  };

  const handleDecrement = () => {
    onRemoveFromCart(item.id);
  };

  return (
    <div className="card-container">
      <img className='card-image' src={image.mobile} alt={name} />
      <div className="button-toggle" data-in-cart={quantity > 0}>
        <button type="submit" className="add-to-cart-btn" onClick={handleAddToCart}>
          <img className='cart-icon' src='/images/icon-add-to-cart.svg' alt='Cart Image'></img>
          Add to Cart
        </button>
        <div className='number-selector'>
          <button className="quantity-btn minus-btn" onClick={handleDecrement}>
            <img className='minus-icon' src='/images/icon-decrement-quantity.svg' alt='Cart Image'></img>
          </button>
          <span>{quantity}</span>
          <button className="quantity-btn plus-btn" onClick={handleIncrement}>
            <img className='plus-icon' src='/images/icon-increment-quantity.svg' alt='Cart Image'></img>
          </button>
        </div>
      </div>
      <div className="card-text-container">
        <p className="category">{category}</p>
        <h2>{name}</h2>
        <p className="price">£{price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;