/* eslint-disable camelcase */
import {Component} from 'react'
import Header from './components/Header'
import TabItem from './components/TabItem'
import DishItem from './components/DishItem'
import './App.css'

class App extends Component {
  state = {
    isLoading: true,
    menuData: [],
    activeCategoryId: '',
    cart: {},
    restaurantName: '', // Added to handle dynamic restaurant names
  }

  componentDidMount() {
    this.getRestaurantMenu()
  }

  getRestaurantMenu = async () => {
    try {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      if (response.ok) {
        const data = await response.json()
        const restaurantName = data[0]?.restaurant_name || ''
        const menuList = data[0]?.table_menu_list || []

        this.setState({
          menuData: menuList,
          activeCategoryId: menuList[0]?.menu_category_id || '',
          restaurantName,
          isLoading: false,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  setActiveTab = id => {
    this.setState({activeCategoryId: id})
  }

  addItemToCart = dishId => {
    this.setState(prevState => ({
      cart: {
        ...prevState.cart,
        [dishId]: (prevState.cart[dishId] || 0) + 1,
      },
    }))
  }

  removeItemFromCart = dishId => {
    this.setState(prevState => {
      const currentQty = prevState.cart[dishId] || 0
      if (currentQty <= 0) return null

      const updatedCart = {...prevState.cart}
      if (currentQty === 1) {
        delete updatedCart[dishId]
      } else {
        updatedCart[dishId] = currentQty - 1
      }
      return {cart: updatedCart}
    })
  }

  render() {
    const {isLoading, menuData, activeCategoryId, cart, restaurantName} =
      this.state

    if (isLoading) {
      return <div className="loader-container">Loading...</div>
    }

    const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0)
    const activeCategory = menuData.find(
      each => each.menu_category_id === activeCategoryId,
    )
    const dishesList = activeCategory ? activeCategory.category_dishes : []

    return (
      <div className="app-container">
        <Header restaurantName={restaurantName} cartCount={totalCartCount} />

        {/* Horizontal Slidable Category List */}
        <ul className="tabs-container">
          {menuData.map(eachCategory => (
            <TabItem
              key={eachCategory.menu_category_id}
              tabDetails={eachCategory}
              isActive={activeCategoryId === eachCategory.menu_category_id}
              setActiveTab={this.setActiveTab}
            />
          ))}
        </ul>

        {/* Current Category Dish Items List */}
        <ul className="dishes-list">
          {dishesList.map(eachDish => (
            <DishItem
              key={eachDish.dish_id}
              dishDetails={eachDish}
              quantity={cart[eachDish.dish_id] || 0}
              addItem={this.addItemToCart}
              removeItem={this.removeItemFromCart}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
