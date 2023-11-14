import React from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Cart from '../../assets/images/cart-icon.png';
import SuccessMsg from '../../components/SuccessMsg';
import ResetLocation from '../../helpers/ResetLocation';

export default class Header extends React.Component {
  handleLogout = async () => {
    try {
      await signOut(getAuth());
      if (this.props.onLogout) {
        this.props.onLogout();
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  render() {
    const {
      productsQuantity,
      removeNavigationMenu,
      validLogin,
    } = this.props;

    return (
      <header>
        <nav className="main-nav flex-container flex-row txt-center">
          <NavLink
            onClick={() => {
              ResetLocation();
              removeNavigationMenu();
            }}
            to="/"
            className="logo-styling txt-center txt-white"
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
                  <React.Fragment>
                    <Link
                      to="/login"
                      className="passive-button-style txt-white"
                      onClick={() => { this.handleLogout() }}
                    >
                      Log out
                    </Link>
                    <Link
                      to="/orders"
                      className="passive-button-style txt-white"
                    >
                      Pedidos
                    </Link>
                  </React.Fragment>
                ) : (
                  <Link
                    to="/login"
                    className="passive-button-style txt-white"
                  >
                    Log in
                  </Link>
                )}
                <NavLink
                  className="cart-btn active-button-style txt-white"
                  to="/cart"
                  onClick={() => {
                    ResetLocation();
                    removeNavigationMenu();
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
    );
  }
}