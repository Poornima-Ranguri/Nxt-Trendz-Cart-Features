import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = productId => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(cartItem => {
        if (cartItem.id === productId) {
          return {...cartItem, quantity: cartItem.quantity + 1}
        }
        return cartItem
      })
      return {cartList: updatedCartList}
    })
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(cartItem => {
          if (cartItem.id === productId) {
            return cartItem.quantity > 1
              ? {...cartItem, quantity: cartItem.quantity - 1}
              : null
          }
          return cartItem
        })
        .filter(cartItem => cartItem !== null)
      return {cartList: updatedCartList}
    })
  }

  removeCartItem = product => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(eachCart => product !== eachCart.id)
    this.setState({cartList: filterCartList})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const productInCart = cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (productInCart) {
        // If the product is already in the cart, increase its quantity
        const updatedCartList = cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {...eachItem, quantity: eachItem.quantity + 1}
          }
          return eachItem
        })
        return {cartList: updatedCartList}
      }
      // If the product is not in the cart, add it with quantity 1
      return {cartList: [...cartList, {...product, quantity: 1}]}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
