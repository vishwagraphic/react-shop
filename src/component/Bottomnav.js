import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import './Bottomnav.scss'
const Topnav = () => {
    return(
        <div>
            <Navbar fixed="bottom" bg="danger" variant="danger" className="footer-bar">
                <Nav className="mr-auto">
                    <Nav.Link className="text-white"><span>©</span> Copyrights 2019. All rights reserved.</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Link to="/" className="px-2 text-white">Career</Link>
                    <Link to="/" className="px-2 text-white">Contact us</Link>
                    <Link to="/" className="px-2 text-white">Press Center</Link>
                    <Link to="/" className="px-2 text-white">Help</Link>
                </Nav>
            </Navbar>
        </div>    
    )
}

export default Topnav;