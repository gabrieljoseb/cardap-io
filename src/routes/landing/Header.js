import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import Cart from '../../assets/images/cart-icon.png'
import SuccessMsg from '../../components/SuccessMsg'
import ResetLocation from '../../helpers/ResetLocation'

export default class Header extends React.Component {
  render() {
    const {
      loginModal,
      productsQuantity,
      handleLogout,
      showModal,
      validLogin,
      removeNavigationMenu,
    } = this.props
    return (
      <header>
        {loginModal}
        <nav className="main-nav flex-container flex-row txt-center">
          <NavLink
            onClick={() => {
              ResetLocation()
              removeNavigationMenu()
            }}
            to="/"
            className="logo-styling txt-center txt-white"
            //className="logo-styling flex-container flex-row txt-center txt-white"
          >
            <img
              width="50"
              height="50"
              className="logo"
              src={logo}
              alt="Cardap.io logo"
            />
          </NavLink>
          <ul className="navigation-menu flex-row pop-font">
            <li>
              <div className="login-and-cart">
                {validLogin ? (
                  <Link
                    to="/"
                    className="passive-button-style txt-white"
                    onClick={() => {
                      ResetLocation()
                      handleLogout()
                    }}
                  >
                    Log out
                  </Link>
                ) : (
                  <div
                    className="passive-button-style txt-white"
                    onClick={() => {
                      ResetLocation()
                      showModal()
                    }}
                  >
                    Log in
                  </div>
                )}
                <NavLink
                  className="cart-btn active-button-style txt-white"
                  to="/cart"
                  onClick={() => {
                    ResetLocation()
                    removeNavigationMenu()
                  }}
                >
                  <img src={Cart} alt="" aria-hidden="true" />
                  {productsQuantity !== 0 && <p>({productsQuantity})</p>}
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
        <SuccessMsg />
      </header>
    )
  }
}
