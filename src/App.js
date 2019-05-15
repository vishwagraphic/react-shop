import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Topnav from './component/Topnav'
import Bottomnav from './component/Bottomnav'
import Home from './component/Home'
import About from './component/About'
import Signin from './component/Signin'
import Register from './component/Register'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: localStorage.userid || '',
        name: localStorage.username || '',
        email: localStorage.useremail || ''
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
  
  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Topnav user={this.state.user} loadUser={this.loadUser}  />
          </header>
          <section>
            <Route exact={true} path="/" component={Home} />
            <Route path="/about"  render={() => <About />} />
            <Route path="/signin" render={() => <Signin loadUser={this.loadUser} />}  />
            <Route path="/register" render={() => <Register user={this.state.user} />} />
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
