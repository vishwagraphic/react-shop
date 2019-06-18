import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import Topnav from './component/Topnav'
import Bottomnav from './component/Bottomnav'
import Home from './component/Home'
import About from './component/About'
import Signin from './component/Signin'
import Register from './component/Register'
import Regconfirm from './component/Regconfirm'
import Product from './component/Product'
import Cart from './component/Cart'
import Products from './component/Products'
import './App.scss'
import { userDetails, cartDetails } from './redux/actions';

const mapStateToProps = state => {
  return{
      user: {
          id: state.userDetails.user.id,
          name: state.userDetails.user.name,
          email: state.userDetails.user.email
      },
      signIn : state.userDetails.signIn,
      cart: {
        count: state.cartDetails.cart.count,
        idArr : state.cartDetails.cart.idArr
      }
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onUserDetails : (user, status) => dispatch(userDetails(user, status)),
    onCartDetails : cart => dispatch(cartDetails(cart))
  }
}

class App extends Component {
  unloaduser = () => {
    let user = {
      id: '',
      name : '',
      email: '',
    }
    let cart = {
      count: 0,
      idArr: {}
    }
    let signInStatus = false
    this.props.onUserDetails(user, signInStatus)
    this.props.onCartDetails(cart)
    localStorage.clear()
  }

  loadUser = () => {
    if (this.props.user.email){
      this.getCartDetails()
    }
  }
  
  cartDetails = (count, id) => {
    let dcount = this.props.cart.idArr || {}
    let totalqty = count + dcount[id]
    if (totalqty !== 0) {
      dcount[id] = (dcount[id]||0) + count
    } else {
      delete dcount[id]
    }
    
    localStorage.setItem('cartCount', parseInt(this.props.cart.count) + parseInt(count))
    localStorage.setItem('idArr', JSON.stringify(dcount))
    console.log(localStorage.cartCount)
    let cart = {
      count : Number(this.props.cart.count) + count,
      idArr : dcount
    }
    console.log(cart)
    this.props.onCartDetails(cart)
    this.updateCart(localStorage.cartCount)
  }

  updateCart = (count) => {
      fetch('https://vue-react-server.herokuapp.com/postCart', {
          method: 'put',
          headers : {"Accept": "application/json", 'Content-Type': 'application/json', "Access-Control-Origin": "*"},
          body : JSON.stringify({
              email: this.props.user.email,
              productids: this.props.cart.idArr,
              count : count
          })
      })
      .then(response => response.json())
      .then(res => {
        if(res === 0){
          this.postItemCart(count)
        }
      })
      .catch(err => console.log(err))
  }
  postItemCart = (count) => {
    fetch('https://vue-react-server.herokuapp.com/postCart', {
          method: 'post',
          headers : {"Accept": "application/json", 'Content-Type': 'application/json', "Access-Control-Origin": "*"},
          body : JSON.stringify({
            email: this.props.user.email,
            productids: this.props.cart.idArr,
            count : count
          })
    })
    .then(response => {
        response.json()
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log('WHAT ERRR' + err))
  }
  getCartDetails = () => {
    fetch('https://vue-react-server.herokuapp.com/cartDetails', {
          method: 'post',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            email: this.props.user.email
          })
    })
    .then(response => response.json())
    .then(res => {
      let cart = {
        count: res[0].totalcount || 0,
        idArr: res[0].productids || []
      }
      this.props.onCartDetails(cart)
      localStorage.setItem('cartCount', this.props.cart.count)
      localStorage.setItem('idArr', JSON.stringify(this.props.cart.idArr))
    })
    .catch(err => console.log('WHAT ERRR' + err))
  }
  render(){
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Topnav user={this.props.user} cart={this.props.cart} signOut={this.unloaduser}  />
          </header>
          <section>
            <Route exact={true} path="/" render={() => <Home cartDetails={this.cartDetails}  />} />
            <Route path="/about"  render={() => <About />} />
            <Route path="/signin" render={() => <Signin loadUser={this.loadUser} />}  />
            <Route path="/register" render={() => <Register user={this.props.user} />} />
            <Route path="/regconfirm" render={() => <Regconfirm />} />
            <Route path="/product/:id" render={() => <Product cartDetails={this.cartDetails} />} />
            <Route path="/Cart" render={() => <Cart cart={this.props.cart} cartDetails={this.cartDetails} />} />
            <Route path="/products" render={() => <Products />} />
          </section> 
          <footer>
            <Bottomnav />
          </footer>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
