import React from "react";
import "./Cart.css";
import ProgressBar from "./ProgressBar";

const THRESHOLD = 1000;
const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };

const Cart = ({ cart, setCart }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const remaining = THRESHOLD - subtotal;
  const giftAdded = cart.some((item) => item.id === FREE_GIFT.id);

  if (subtotal >= THRESHOLD && !giftAdded) {
    setCart([...cart, { ...FREE_GIFT, quantity: 1 }]);
  } else if (subtotal < THRESHOLD && giftAdded) {
    setCart(cart.filter((item) => item.id !== FREE_GIFT.id));
  }

  const increaseQuantity = (id) => {
    if (id === FREE_GIFT.id) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0 || item.id === FREE_GIFT.id)
    );
  };

  return (
    <div className="cart">
      <h2 className="cart-title">Cart Summary</h2>
      <div className="subtotal-row">
        <span>Subtotal:</span>
        <span>Rs:{subtotal}</span>
      </div>

      {subtotal >= THRESHOLD ? (
        <p className="highlight">You got a free Wireless Mouse!</p>
      ) : (
        <div className="progress-message">
          <ProgressBar
            progress={(subtotal / THRESHOLD) * 100}
            message={`Add ₹${remaining} more to get a FREE Wireless Mouse!`}
          />
        </div>
      )}

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-message"> Your cart is empty. Add some products to see them here!</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <p>{item.name}</p>
                <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
              </div>
              {item.id !== FREE_GIFT.id ? (
                <div className="cart-item-actions">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="increase" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              ) : (
                <span className="free-gift">FREE GIFT</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
