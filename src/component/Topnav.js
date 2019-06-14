import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Navbar, Nav, Dropdown, NavItem, } from 'react-bootstrap';
import logo from '../logo.png'
import cart from '../cart-icon.png'
import './Topnav.scss'

const Topnav = (props) => {
    console.log(props)
    let showSignStatus
    if(props.user.name){
        showSignStatus = <Dropdown as={NavItem}>
                <Dropdown.Toggle as={'div'} className="text-white">Hi, {props.user.name.split(' ')[0]}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to="/" className="text-white drop-menu">Profile</Link>
                  <Link to="/" onClick={props.signOut} className="text-white drop-menu">Signout</Link>
                </Dropdown.Menu>
            </Dropdown>
    }else{
        showSignStatus = <Link to="/signin" className="px-2 text-white">Signin</Link>
    }
    return(
        <div>
            
            <Navbar fixed="top" bg="danger" variant="danger">
                <Link exact="true" to="/">
                    <img src={logo} alt="logo" className="App-logo" />
                    <span className="text-yellow my-2 d-inline-block logo">
                        REACT-SHOPPING
                    </span>
                </Link>
                
                <Nav className="mr-auto ml-2">
                  <Link to="/about" className="px-2 text-white">About</Link>
                  <Link to="/" className="px-2 text-white">Products</Link>
                </Nav>
                <Nav className="ml-auto mr-2">
                    {showSignStatus}
                    <Link className="px-2 text-white cart-icon" to="/Cart"><span className="cart-count">{props.cart.count}</span><img src={cart} alt="cart" /></Link>
                </Nav>
            </Navbar>
        </div>    
    )
}

export default withRouter(Topnav)