import React from 'react';
import "./addtocard.css";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Buy = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className='buy-page empty-cart'>
        <div className="container">
          <h1>🛒 Your Cart is Empty</h1>
          <p style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>
            Start shopping to add items to your cart!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='buy-page'>
      <div className="container">
        <h1>Your Shopping Cart</h1>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.Name} />
            <div>
              <h2>{item.Name}</h2>
              <p><strong>Price:</strong> ₹{item.Price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Subtotal:</strong> ₹{item.Price * item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h3>Total: ₹{totalPrice}</h3>
          <div>
            <button onClick={handleClearCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;