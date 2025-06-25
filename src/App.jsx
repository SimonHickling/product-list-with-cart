import { useState } from 'react'
import './App.css'
import Card from './components/card'
import data from './data/data.json'
import Basket from './components/basket'
import Confirmation from './components/confirmation'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0)
    )
  }

  const getItemQuantity = (itemId) => {
    const item = cartItems.find(cartItem => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const handleConfirmOrder = () => {
    setShowConfirmation(true)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setCartItems([]) // Clear cart after confirmation
  }

  const thumbnails = import.meta.glob('./assets/images/*', { eager: true, import: 'default' })

  return (
    <>
      <div className='page-title'>
        <h1>Desserts</h1>
      </div>
      <div className='main-page-layout'>
        <div className="card-wrapper">
          {data.map((item) => {
            const matchingPath = Object.keys(thumbnails).find((path) =>
              path.endsWith(item.image.mobile)
            );
            const imageURL = matchingPath ? thumbnails[matchingPath] : '';
            return (
              <Card
                key={item.id}
                item={{ ...item, image: { ...item.image, mobile: imageURL } }}
                quantity={getItemQuantity(item.id)}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
              />
            );
          })}
        </div>
        <div className='basket-area'>
          {showConfirmation && <div className="overlay"></div>}
          {showConfirmation ? (
            <Confirmation cartItems={cartItems} onClose={handleCloseConfirmation} />
          ) : (
            <Basket cartItems={cartItems} onConfirmOrder={handleConfirmOrder} />
          )}
        </div>
      </div>
    </>
  )
}

export default App
