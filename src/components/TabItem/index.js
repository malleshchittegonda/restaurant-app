/* eslint-disable camelcase */
import {Component} from 'react'
import './index.css'

class TabItem extends Component {
  render() {
    const {tabDetails, isActive, setActiveTab} = this.props
    const {menu_category, menu_category_id} = tabDetails

    const activeTabClass = isActive ? 'active-tab' : ''

    return (
      <li className="tab-list-item">
        <button
          type="button"
          className={`tab-btn ${activeTabClass}`}
          onClick={() => setActiveTab(menu_category_id)}
        >
          {menu_category}
        </button>
      </li>
    )
  }
}

export default TabItem
