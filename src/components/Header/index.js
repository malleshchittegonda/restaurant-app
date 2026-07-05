import {Component} from 'react'
import './index.css'

class Header extends Component {
  render() {
    const {cartCount, restaurantName} = this.props
    return (
      <header className="navbar">
        <h1 className="logo-heading">{restaurantName}</h1>
        <div className="cart-container">
          <p className="my-orders-text">My Orders</p>
          <div className="cart-icon-wrapper">
            <span className="cart-count-badge">{cartCount}</span>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
