/* eslint-disable camelcase */
import {Component} from 'react'
import './index.css'

class DishItem extends Component {
  render() {
    const {dishDetails, quantity, addItem, removeItem} = this.props
    const {
      dish_id,
      dish_name,
      dish_price,
      dish_currency,
      dish_description,
      dish_calories,
      dish_image,
      dish_Availability,
      addonCat, // Changed from addoncat to camelCase addonCat
    } = dishDetails

    return (
      <li className="dish-item">
        <div className="dish-details">
          <h1 className="dish-name">{dish_name}</h1>
          <p className="dish-currency-price">
            {dish_currency} {dish_price}
          </p>
          <p className="dish-description">{dish_description}</p>

          {dish_Availability ? (
            <div className="controller-container">
              <button
                type="button"
                className="control-btn"
                onClick={() => removeItem(dish_id)}
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="control-btn"
                onClick={() => addItem(dish_id)}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-text">Not available</p>
          )}

          {addonCat && addonCat.length > 0 && (
            <p className="customizations-text">Customizations available</p>
          )}
        </div>

        <p className="dish-calories">{dish_calories} calories</p>
        <img src={dish_image} alt={dish_name} className="dish-image" />
      </li>
    )
  }
}

export default DishItem
