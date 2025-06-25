import React from "react";
import { useState, useEffect } from "react";
import data from '../data/data.json'
import './basket.css'
import './confirmation.css'

const imgItem = import.meta.glob('../assets/images/*', { eager: true, import: 'default' })


const Confirmation = ({ cartItems }) => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
        <div className="basket-container confirm-container">
            <img className='confirmed-icon' src='/images/icon-order-confirmed.svg'></img>
            <h2>Order Confirmed ({totalItems}) Items</h2>    
                   <div className="basket-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="basket-item">
                           
                          {item.image?.thumbnail && (() => {
                            const filename = item.image.thumbnail.split('/').pop(); // grabs just "image-cake-thumbnail.jpg"
                            const path = `../assets/images/${filename}`;
                            const src = imgItem[path];

                            return src ? (
                                <img
                                src={src}
                                alt={`${item.name} thumbnail`}
                                className="item-thumbnail"
                                />
                            ) : (
                                <p className="warning">Image not found: {filename}</p>
                            );
                            })()}
                            <h4>{item.name}</h4>
                            <div className="item-details">
                                <div className="item-price-info">
                                    <span className="quantity">{item.quantity}x </span>
                                    <span className="unit-price"> at £{item.price.toFixed(2)}</span>
                                    <span className="total-price"> Total £{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                 
                            </div>
                            <hr/>
                        </div>
                    ))}
                    <div className="order-total">
                        <div className="total-row">
                            <span>Order Total </span>
                            <span className="sum-total">£{totalPrice.toFixed(2)}</span>
                        </div>
                    </div> 
                    <div className="carbon-neutral">
                        <img src='/images/icon-carbon-neutral.svg' alt="Carbon Neutral" />
                        <span>This is a <strong>carbon-neutral</strong> delivery</span>
                    </div>
                    <button className="confirm-order-btn" onClick={() => window.location.reload()}>Start a new order</button>
                </div>
            
        </div>
        </>
    )
}

export default Confirmation