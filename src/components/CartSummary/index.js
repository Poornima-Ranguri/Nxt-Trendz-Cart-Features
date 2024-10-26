import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const orderTotal = cartList.reduce(
        (acc, eachCart) => acc + eachCart.price * eachCart.quantity,
        0,
      )

      return (
        <div className="cart">
          <h1>Order Total: Rs {orderTotal}/-</h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
