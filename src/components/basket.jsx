import React from "react";
import { useState, useEffect } from "react";
import data from '../data/data.json'
import './basket.css'

const Basket = ({ cartItems, onConfirmOrder }) => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Debug: Check if onConfirmOrder is being passed
    console.log("onConfirmOrder prop:", onConfirmOrder);

    const handleConfirmClick = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("Button clicked in Basket component");
        if (onConfirmOrder) {
            console.log("Calling onConfirmOrder function");
            onConfirmOrder();
        } else {
            console.log("onConfirmOrder is undefined!");
        }
    };

    return (
        <>
        <div className="basket-container">
            <h2>Your Cart ({totalItems})</h2>
            
            {cartItems.length === 0 ? (
                <>
                    <img className="cart-image" src='/images/illustration-empty-cart.svg' alt="Cart Image"></img>
                    <div className="basket-item-container">
                        <p>Your added items will show here</p>
                    </div>
                </>
            ) : (
                <div className="basket-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="basket-item">
                            <div className="item-details">
                                <h4>{item.name}</h4>
                                <div className="item-price-info">
                                    <span className="quantity">{item.quantity}x</span>
                                    <span className="unit-price">@ £{item.price.toFixed(2)}</span>
                                    <span className="total-price">£{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="order-total">
                        <div className="total-row">
                            <span>Order Total</span>
                            <strong>£{totalPrice.toFixed(2)}</strong>
                        </div>
                    </div>
                    
                    <div className="carbon-neutral">
                        <img src='/images/icon-carbon-neutral.svg' alt="Carbon Neutral" />
                        <span>This is a <strong>carbon-neutral</strong> delivery</span>
                    </div>
                    
                    <button className="confirm-order-btn" onClick={handleConfirmClick}>Confirm Order</button>
                </div>
            )}
        </div>
        </>
    )
}

export default Basket;