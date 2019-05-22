import React, {Component} from 'react'
import {Button, Alert, Container, Row, Col} from 'react-bootstrap'

class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productDetail: []
        }
    }
    componentDidMount() {
        let url = window.location.href
        let id = url.substring(url.lastIndexOf('/') + 1)
        fetch(`https://vue-react-server.herokuapp.com/product/${id}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id}), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(product => {
            let imgArr = []
            imgArr = product[0].imageurls.split(',')
            for (let i = 0; i < imgArr.length; i++) {
                if (imgArr[i].indexOf('bbystatic') > -1) {
                    product[0].imageurls = imgArr[i]
                }
            }
            this.setState({productDetail: product[0]})
        })
    }
    render(){
        console.log(this.props)
        return(
            <div className="container my-3">
                <Alert variant="info" className="clearfix" >
                    <span className="d-inline-block py-1 font-weight-bold">{this.state.productDetail.name}</span>
                </Alert>
                <Container>
                    <Row>
                        <Col cols="5">
                            <img width="350" height="auto" src={this.state.productDetail.imageurls} alt="big-product" />
                        </Col>
                        <Col>
                            <div>
                                <h5>{this.state.productDetail.categories}</h5>
                                <p>by {this.state.productDetail.brand}</p>
                                <ul className="px-0">
                                    <li>{this.state.productDetail.categories}</li>
                                    <li>INCLUDES DELUXE ACCESSORY COOKING KIT: A Divider for the cooking basket, 50 perforated parchment steaming papers, an 8 inch cake carrel, an 8 inch pizza pan, multi-purpose rack with 3 stainless steel skewers, cupcake silicone pan, and rubber mat.</li>
                                    <li>INCLUDES RECIPES: Included is a Recipe Book that has 100 Air Fryer recipes. The Yedi Houseware mobile app for iOS and Android and the Yedi Houseware Appliances website has new Air Fryer recipes & content uploaded every week! Also comes with a COOKING TIME TABLE.</li>
                                </ul>
                            </div>
                        </Col>
                        <Col>
                            <p>Get it <strong>Tue, May 24 - Friday May 27</strong> if you choose FREE Shipping at checkout.</p>
                            <p>Get it <strong>Mon, May 23</strong> if you order within 31 hrs 33 mins and choose paid shipping at checkout.</p>
                            <p>In Stock</p>
                            <p>Out of Stock</p>
                            <p>Qty </p>
                            <Button block variant="primary" onClick={this.props.cartCount}>Add to cart</Button>
                            <Button block variant="danger">Buy now</Button><br />
                            <p>Sold by Product brand</p>
                            <p>Item arrives in packaging that reveals what's inside.</p>
                        </Col>
                    </Row>
                </Container>
            </div>    
        )
    }
    
}

export default Product;