import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

class cartTile extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            qty : this.props.quantity,
            render : true
        }
    }
    onInputChange = (event) => {
        let updateCount = event.target.value - this.state.qty
        this.props.cartUpdate(updateCount, event.target.id)
        this.setState({qty : event.target.value})
    }
    onDelete = () => {
        let updateCount = 0 - this.state.qty
        this.props.cartUpdate(updateCount, this.props.productid)
        this.setState({render : false})
    }
    render(){
        const {imageurl, name, price, productid, brand} = this.props
        if(!this.state.render){
            return null
        } else{
            return(
                <Row>
                    <Col cols="3">
                    <img width="auto" height="70px" src={imageurl} alt="big-product" />
                    </Col>
                    <Col cols="4">
                        <ul className="ltn">
                            <li className="font-weight-bold pointer hover" >{name} </li>
                            <li>{brand}</li>
                        </ul>
                    </Col>
                    <Col >
                            <div className="font-weight-bold text-danger">${price}</div>
                    </Col>
                    <Col >
                        <div className="" style={{width: '80px'}}>Quantity: 
                            <input type="text" name="quantity" className="w-100 text-center" id={productid} defaultValue={this.props.quantity} onChange={this.onInputChange} />
                        </div>
                            
                    </Col>
                    <Col >
                    <div onClick={this.onDelete} className="text-info">Delete</div>
                    </Col>
                </Row>
            )
        }
    }
}
export default withRouter(cartTile)          