import React, {Component} from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap';

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cartData: []
        };
    }
    componentDidMount(){
        let ids = this.props.cart.idArr
        fetch(`https://vue-react-server.herokuapp.com/cart`, {
            method: 'POST',
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
        const cartTile = this.state.cartData.map((data, i) => {
            let imgArr = []
            imgArr = data.imageurls.split(',')
            for (let i = 0; i < imgArr.length; i++) {
                if (imgArr[i].indexOf('bbystatic') > -1) {
                    data.imageurls = imgArr[i]
                }
            }
            return <Row key={i}>
                <Col cols="3">
                <img width="auto" height="70px" src={data.imageurls} alt="big-product" />
                </Col>
                <Col cols="4">
                    <ul className="ltn">
                        <li className="font-weight-bold pointer hover">{data.name} </li>
                        <li>{data.brand}</li>
                    </ul>
                </Col>
                <Col >
                        <div className="font-weight-bold text-danger">{data.prices_amountmin}</div>
                </Col>
                    <Col >
                        <div className="text-info">Delete</div>
                    </Col>
            </Row>
        });
        return(
            <div className="container my-3">
                <Alert variant="secondary" show className="clearfix"><span className="dib py-1 font-weight-bold">Your Cart Details</span></Alert>
                <Container>
                    {cartTile}
                </Container>
            </div>
        )
    }
}

export default Cart