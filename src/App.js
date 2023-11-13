import React from 'react'
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'
import Header from './routes/landing/Header.js'
import {
  Cart,
  Menu,
  SingleItem,
  SuccessfulPayment,
  Login
} from './routes/index'
import { allProductsData } from './data/AllProductsData.js'
import { AllCategories } from './data/AllCategories'
import Item from './routes/singleItem/Item.js'
import CartTotals from './routes/cart/CartTotals.js'
import CartItem from './routes/cart/CartItem.js'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allCategories: [],
      activeCategory: 'Menu',
      cartItems: [],
      clearedCart: false,
      allProducts: [],
      productsQuantity: 0,
      totalPayment: 0,
      formError: {},
      submit: false,
      preferenceId: null,
      user: null,
      mesaId: null
    }

    this.getProductsByCategory = this.getProductsByCategory.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.handleAddProduct = this.handleAddProduct.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
    this.removeNavigationMenu = this.removeNavigationMenu.bind(this)
    this.findMenuItem = this.findMenuItem.bind(this)
    this.handleLogout = this.handleLogout.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  // GET DATA
  /*******************************************************/
  allCategoriesData = new Promise((resolve, reject) => {
    if (true) {
      resolve(AllCategories)
      return
    }
  })
  allProductsData = new Promise((resolve, reject) => {
    if (true) {
      resolve(allProductsData)
      return
    }
  })

  getCategories = async () => {
    try {
      const result = await this.allCategoriesData
      this.setState({ allCategories: result })
    } catch (error) {
      console.log(error)
    }
  }

  getAllProducts = async () => {
    try {
      const result = await this.allProductsData
      this.setState({ allProducts: result })
    } catch (error) {
      console.log(error)
    }
  }

  // HANDLE CHANGE
  /*******************************************************/
  changeCategory = async (newCategory) => {
    this.setState({ activeCategory: newCategory })
    this.getProductsByCategory(newCategory)
  }

  getProductsByCategory = async (category) => {
    let separateCategoriesByname = []
    //Separate arrays by category names
    const separateCategories = allProductsData.reduce(function (
      singleCategory,
      singleItem,
    ) {
      separateCategoriesByname = Object.keys(singleCategory)

      if (!singleCategory[singleItem.Category])
        singleCategory[singleItem.Category] = singleItem
      else
        singleCategory[singleItem.Category] = Array.isArray(
          singleCategory[singleItem.Category],
        )
          ? singleCategory[singleItem.Category].concat(singleItem)
          : [singleCategory[singleItem.Category]].concat(singleItem)
      return singleCategory
    },
      {})

    const result = Object.keys(separateCategories).map(
      (e) => separateCategories[e],
    )

    let singleCategoryArray = []
    result.map((categories) => {
      return singleCategoryArray.push(categories)
    })
    //Change products by category
    separateCategoriesByname.forEach((cate) => {
      if (cate === category) {
        return this.setState({ allProducts: separateCategories[category] })
      }
      if (category === 'Menu') {
        return this.setState({ allProducts: allProductsData })
      }
    })
  }

  // CART LOGIC
  /*******************************************************/
  CheckRepeatableProducts = (
    cartItems,
    targetProduct,
    userSelectedAttributes,
  ) => {
    let item
    let productsById = cartItems.filter((item) => item.id === targetProduct.id)
    productsById.forEach((targetProduct) => {
      if (this.MatchingAttributes(userSelectedAttributes, targetProduct)) {
        item = targetProduct
      }
    })
    return item
  }

  MatchingAttributes = (userSelectedAttributes, targetProduct) => {
    const attributesMatch = (groupOne, groupTwo) => {
      return Object.values(groupOne)[1] === Object.values(groupTwo)[1]
    }

    let truthyValuesCounter = 0
    let i = 0
    while (i < userSelectedAttributes.length) {
      if (
        attributesMatch(
          userSelectedAttributes[i],
          targetProduct?.userSelectedAttributes[i],
        )
      ) {
        truthyValuesCounter += 1
      }
      i += 1
    }

    if (truthyValuesCounter === userSelectedAttributes?.length) {
      return true
    }
  }

  updateCartQuantity(
    actionToPerfrom,
    productAlreadyInCart,
    userSelectedAttributes,
  ) {
    const repeatableProduct = this.CheckRepeatableProducts(
      this.state.cartItems,
      productAlreadyInCart,
      userSelectedAttributes,
    )
    //Find the target product to update by index
    const indexOfRepeatableProduct = this.state.cartItems.indexOf(
      repeatableProduct,
    )
    const currentProductList = [...this.state.cartItems]
    //Check type of action
    if (actionToPerfrom === 'addProduct') {
      currentProductList[indexOfRepeatableProduct].quantity += 1
    } else {
      currentProductList[indexOfRepeatableProduct].quantity -= 1
    }

    return currentProductList
  }

  handleAddProduct = (targetProduct, userSelectedAttributes) => {

    let updatedProductList
    const productAlreadyInCart = this.CheckRepeatableProducts(
      this.state.cartItems,
      targetProduct,
      userSelectedAttributes,
    )

    if (productAlreadyInCart) {
      updatedProductList = this.updateCartQuantity(
        'addProduct',
        productAlreadyInCart,
        userSelectedAttributes,
      )
    } else {
      let modifiedProduct = JSON.parse(JSON.stringify(targetProduct))
      let clone

      for (let i = 0; i < targetProduct?.attributes?.length; i++) {
        for (let j = 0; j < targetProduct?.attributes[i]?.items?.length; j++) {
          if (
            targetProduct.attributes[i].items[j].value ===
            userSelectedAttributes[i].value
          ) {
            clone = {
              ...targetProduct.attributes[i].items[j],
            }
            clone.isSelected = true

            modifiedProduct.attributes[i].items[j].isSelected = true

            modifiedProduct.attributes[i].items[j] = {
              ...clone,
            }
          }
        }
      }

      updatedProductList = [
        ...this.state.cartItems,
        {
          ...modifiedProduct,
          userSelectedAttributes,
          quantity: 1,
        },
      ]
    }

    this.setState({ cartItems: updatedProductList })
    //Update cart amount
    if (updatedProductList.length <= 1) {
      updatedProductList.map((item) => {
        return this.setState({ productsQuantity: item.quantity })
      })
    } else {
      let productListArray = updatedProductList.map((item) => item.quantity)
      let sum = productListArray.reduce((a, b) => a + b, 0)
      this.setState({ productsQuantity: sum })
    }
  }

  // Remove Product From Cart
  handleRemoveProduct = (targetProduct, userSelectedAttributes) => {
    let updatedProductList
    let repeatableProduct = this.CheckRepeatableProducts(
      this.state.cartItems,
      targetProduct,
      userSelectedAttributes,
    )
    if (repeatableProduct.quantity > 1) {
      updatedProductList = this.updateCartQuantity(
        'removeProduct',
        repeatableProduct,
        userSelectedAttributes,
      )
    } else {
      const products = [...this.state.cartItems]
      const indexOfProduct = products.indexOf(repeatableProduct)
      products.splice(indexOfProduct, 1)
      updatedProductList = products
    }
    this.setState({ cartItems: updatedProductList })

    //Update cart amount
    if (updatedProductList.length <= 1) {
      updatedProductList.map((item) => {
        return this.setState({ productsQuantity: item.quantity })
      })
    } else {
      let productListArray = updatedProductList.map((item) => item.quantity)
      let sum = productListArray.reduce((a, b) => a + b)
      this.setState({ productsQuantity: sum })
    }
    if (updatedProductList.length === 0) {
      this.setState({ productsQuantity: 0 })
    }
  }

  getTotalPrice = (cartItems) => {
    let totalPayment = 0
    cartItems.map((item) => {
      const correctPrice = item.ItemPrice
      return (totalPayment = totalPayment + correctPrice * item.quantity)
    })
    for (let item of cartItems) {
      const correctPrice = item.ItemPrice
      totalPayment = totalPayment + correctPrice * item.quantity
    }
    totalPayment = parseFloat(totalPayment.toFixed(2))

    this.setState({ totalPayment: totalPayment })
    this.setState({ taxes: ((totalPayment * 10) / 100).toFixed(2) })
  }

  successMsg() {
    const alertMessage = document.querySelector('.success-msg')
    alertMessage.classList.add('visible')
    setTimeout(() => {
      alertMessage.classList.remove('visible')
    }, 1000)
  }

  showHiddenMenu() {
    const hiddenMenu = document.querySelector('.navigation-menu')
    hiddenMenu.classList.toggle('active')
  }
  removeNavigationMenu() {
    const hiddenMenu = document.querySelector('.navigation-menu')
    hiddenMenu.classList.remove('active')
  }

  removeMenu() {
    const hiddenMenu = document.querySelector('.menu')
    hiddenMenu.classList.remove('active')
  }

  findMenuItem(e) {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    const collectData = [];

    allProductsData.forEach((product) => {
      if (product.ItemName.toLowerCase().includes(searchTerm)) {
        collectData.push(product);
      }
    });

    this.setState({ allProducts: collectData });
  }

  //! Other
  async componentDidMount() {
    // Verificar se há um token na URL (vindo do QR Code)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      try {
        const response = await fetch(`/api/validate-token?token=${token}`);
        const data = await response.json();
        if (response.ok) {
          // Token válido, continue com o fluxo normal
          console.log('Acesso permitido para a mesa:', data.mesaId);
          // Armazena o ID da mesa no estado do componente
          this.setState({ mesaId: data.mesaId });
        } else {
          // Token inválido
          console.log('Token inválido')
          this.redirectToError(); // Redireciona para uma tela de erro
        }
      } catch (error) {
        this.redirectToError(); // Redireciona para uma tela de erro
      }
    } else {
      // Token não presente na URL
      this.redirectToError(); // Redireciona para uma tela de erro
    }

    // Verificar se o usuário já está logado
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      this.redirectToLogin();
      return; // Interrompe a execução do método
    }
    this.setState({ user: JSON.parse(savedUser) });

    this.getCategories();
    this.getAllProducts();
    this.getProductsByCategory(this.state.activeCategory);
    this.getTotalPrice(this.state.cartItems);
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, mesaId } = this.state;

    // Verifica se o estado do usuário mudou e redireciona para login se necessário
    if (!user && prevState.user) {
      this.redirectToLogin();
    }

    // Verifica se o estado do mesaId mudou e redireciona para erro se necessário
    if (!mesaId && prevState.mesaId) {
      this.redirectToError();
    }
  }

  redirectToLogin = () => {
    this.props.navigate('/login');
  };

  redirectToError = () => {
    this.props.navigate('/error');
  };

  handleLogout = () => {
    this.setState({ user: null });
    localStorage.removeItem('user'); // Remove o usuário do localStorage
  };

  setUser = (userInfo) => {
    this.setState({ user: userInfo });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { cartItems } = this.state
    if (cartItems !== nextState.cartItems) {
      this.getTotalPrice(nextState.cartItems)
    }

    return true
  }

  render() {
    return (
      <div>
        <Header
          showHiddenMenu={this.showHiddenMenu}
          removeNavigationMenu={this.removeNavigationMenu}
          productsQuantity={this.state.productsQuantity}
          validLogin={this.state.user !== null}
          onLogout={this.handleLogout}
        />
        <Routes>
          <Route path="/login" element={<Login setUser={this.setUser} />} />
          <Route
            path="/"
            element={
              <Menu
                findMenuItem={this.findMenuItem}
                allProducts={this.state.allProducts}
                allCategories={this.state.allCategories}
                changeCategory={this.changeCategory}
                handleAddProduct={this.handleAddProduct}
                handleRemoveProduct={this.handleRemoveProduct}
                successMsg={this.successMsg}
                activeCategory={this.state.activeCategory}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                findMenuItem={this.findMenuItem}
                allProducts={this.state.allProducts}
                allCategories={this.state.allCategories}
                changeCategory={this.changeCategory}
                handleAddProduct={this.handleAddProduct}
                handleRemoveProduct={this.handleRemoveProduct}
                successMsg={this.successMsg}
                activeCategory={this.state.activeCategory}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                CartItem={
                  <CartItem
                    successMsg={this.successMsg}
                    cartItems={this.state.cartItems}
                    handleAddProduct={this.handleAddProduct}
                    handleRemoveProduct={this.handleRemoveProduct}
                  />
                }
                cartTotals={
                  <CartTotals
                    className="cart-carttotals"
                    totalPayment={this.state.totalPayment}
                    cartItems={this.state.cartItems}
                    productsQuantity={this.state.productsQuantity}
                  />
                }
                cartItems={this.state.cartItems}
                clearedCart={this.state.clearedCart}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <SingleItem
                item={
                  <Item
                    successMsg={this.successMsg}
                    handleAddProduct={this.handleAddProduct}
                    handleRemoveProduct={this.handleRemoveProduct}
                  />
                }
              />
            }
          />
          <Route path="/successful-payment" element={<SuccessfulPayment />} />
        </Routes>
      </div>
    )
  }
}

function AppWithNavigate(props) {
  let navigate = useNavigate();
  return <App {...props} navigate={navigate} />;
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppWithNavigate />} />
      </Routes>
    </BrowserRouter>
  );
}