import React, {Component} from 'react'
import { Container, Alert } from 'react-bootstrap';
import CartTile from './common/CartTile'

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            count : '',
            id : '',
            cart : this.props.cart
        }
    }
    cartUpdate = (count, id) => {
        this.props.cartDetails(Number(count), id)
    }
    componentDidMount(){
        let ids = this.props.cart.idArr || {}
        fetch(`https://vue-react-server.herokuapp.com/cart`, {
            method: 'post',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ids: ids}), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(cartProduct => {
            this.setState({cartData : cartProduct})
        })
    }
    
    render(){
        const ProductCartTile = this.state.cartData.map((data, i) => {
            let imgArr = []
            imgArr = data.imageurls.split(',')
            for (let i = 0; i < imgArr.length; i++) {
                if (imgArr[i].indexOf('bbystatic') > -1) {
                    data.imageurls = imgArr[i]
                }
            } 
            return <CartTile cart={this.props.cart} key={i} cartUpdate={this.cartUpdate} productid={data.productid} price={data.prices_amountmin} name={data.name}
                       brand={data.brand} imageurl={data.imageurls} quantity={data.quantity} /> 
        })
        return(
            <div className="container my-3">
                <Alert variant="secondary" show className="clearfix"><span className="dib py-1 font-weight-bold">Your Cart Details</span></Alert>
                <Container>
                    {ProductCartTile}
                </Container>
            </div>
        )
    }
}

export default Cart