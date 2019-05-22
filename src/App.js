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
        count: 0
      }
    }
  }
  loadUser = (userData) => {
    this.setState({user : {
      id: userData.id,
      name : userData.name,
      email: userData.email
    }})
  }
  cartCount = () => {
    this.setState({cart : {
      count : this.state.cart.count + 1
    }})
  }
  
  render(){
    console.log(this.props.cartCount)
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Topnav user={this.state.user} loadUser={this.loadUser} cart={this.state.cart}  />
          </header>
          <section>
            <Route exact={true} path="/" render={() => <Home cartCount={this.cartCount}  />} />
            <Route path="/about"  render={() => <About />} />
            <Route path="/signin" render={() => <Signin loadUser={this.loadUser} />}  />
            <Route path="/register" render={() => <Register user={this.state.user} />} />
            <Route path="/product/:id" render={() => <Product cartCount={this.cartCount} />} />
            <Route path="/Cart" render={() => <Cart />} />
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
