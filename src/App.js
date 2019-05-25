import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Topnav from './component/Topnav'
import Bottomnav from './component/Bottomnav'
import Home from './component/Home'
import About from './component/About'
import Signin from './component/Signin'
import Register from './component/Register'
import Product from './component/Product'
import Cart from './component/Cart'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: localStorage.userid || '',
        name: localStorage.username || '',
        email: localStorage.useremail || ''
      },
      cart: {
        count: localStorage.cartCount || 0,
        idArr : JSON.parse(localStorage.getItem('idArr')) || []
      }
    }
    console.log(this.state.cart.idArr)
  }
  loadUser = (userData) => {
    this.setState({user : {
      id: userData.id,
      name : userData.name,
      email: userData.email
    }})
    if(userData.cartCount === 0){
      this.setState({cart: {
        count: 0,
        idArr : []
      }})
    }
  }
  cartDetails = (count, id) => {
    let idArrVal = this.state.cart.idArr || []
    idArrVal.push(id)
    
    this.setState({cart : {
      count : Number(this.state.cart.count) + count,
      idArr : idArrVal
    }})
    localStorage.setItem('cartCount', this.state.cart.count+1)
    localStorage.setItem('idArr', JSON.stringify(idArrVal))
  }
  
  render(){
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Topnav user={this.state.user} loadUser={this.loadUser} cart={this.state.cart}  />
          </header>
          <section>
            <Route exact={true} path="/" render={() => <Home cartDetails={this.cartDetails}  />} />
            <Route path="/about"  render={() => <About />} />
            <Route path="/signin" render={() => <Signin loadUser={this.loadUser} />}  />
            <Route path="/register" render={() => <Register user={this.state.user} />} />
            <Route path="/product/:id" render={() => <Product cartDetails={this.cartDetails} />} />
            <Route path="/Cart" render={() => <Cart cart={this.state.cart} />} />
          </section> 
          <footer>
            <Bottomnav />
          </footer>
        </Router>
      </div>
    );
  }
}

export default App;
