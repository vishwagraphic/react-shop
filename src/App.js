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
      signIn : false,
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
  
  unloaduser = () => {
    this.setState({user : {
        id: '',
        name : '',
        email: '',
      },
      cart: {
        count: 0,
        idArr: []
      }
    })
    localStorage.clear()
  }

  loadUser = (userData, signInStatus) => {
    console.log(userData)
    this.setState({user : {
      id: userData.id,
      name : userData.name,
      email: userData.email
    },
    signIn : signInStatus
    })
    if (this.state.user.email){
      this.getCartDetails()
    }
  }

  /* componentDidMount () {
    console(localStorage.username)
    if (localStorage.username) {
      this.setState({signin : true})
      this.setState({user: {signin : true}})
    } else {
      this.setState({signin : false})
    }
  
  } */
  
  cartDetails = (count, id) => {
    console.log(count, id)
    let idArrVal = this.state.cart.idArr || []
    idArrVal.push(id)
    
    this.setState({cart : {
      count : Number(this.state.cart.count) + Number(count),
      idArr : idArrVal
    }})
    localStorage.setItem('cartCount', this.state.cart.count+1)
    localStorage.setItem('idArr', JSON.stringify(idArrVal))
    this.updateCart()
  }

  updateCart = () => {
    console.log(this.state.cart.idArr)
      /* var  dcount = {};
      this.state.cart.idArr.forEach(function(i) { dcount[i] = (dcount[i]||0) + 1;}); */
      fetch('http://localhost:8081/postCart', {
          method: 'put',
          headers : {"Accept": "application/json", 'Content-Type': 'application/json', "Access-Control-Origin": "*"},
          body : JSON.stringify({
              email: this.state.user.email,
              productids: this.state.cart.idArr,
              count : Number(this.state.cart.count) + 1
          })
      })
      .then(response => response.json())
      .then(res => {
        if(res === 0){
          this.postItemCart()
        }
      })
      .catch(err => console.log(err))
  }
  postItemCart = () => {
    /* var  dcount = {};
    this.state.cart.idArr.forEach(function(i) { dcount[i] = (dcount[i]||0) + 1;}); */
    fetch('http://localhost:8081/postCart', {
          method: 'post',
          headers : {"Accept": "application/json", 'Content-Type': 'application/json', "Access-Control-Origin": "*"},
          body : JSON.stringify({
            email: this.state.user.email,
            productids: this.state.cart.idArr,
            count : Number(this.state.cart.count) + 1
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
    fetch('http://localhost:8081/cartDetails', {
          method: 'post',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            email: this.state.user.email
          })
    })
    .then(response => response.json())
    .then(res => {
      this.setState({cart : {
        count: res[0].totalcount || 0,
        idArr: res[0].productids || []
      }})
      localStorage.setItem('cartCount', this.state.cart.count)
      localStorage.setItem('idArr', JSON.stringify(this.state.cart.idArr))
    })
    .catch(err => console.log('WHAT ERRR' + err))
  }
  
  render(){
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Topnav user={this.state.user} loadUser={this.loadUser} cart={this.state.cart} signOut={this.unloaduser}  />
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
