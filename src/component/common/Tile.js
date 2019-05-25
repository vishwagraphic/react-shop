import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import {Button, Card, Col} from 'react-bootstrap'

class Tile extends Component { 
    showProduct = () => {
        console.log('clicked' + this.props.id)
        this.props.history.push(`/product/${this.props.id}`)
    }
    render(){
        const {id, name, brand, imageurl, rating, price} = this.props
        return(
        <Col>
                <Card className="mb-2">
                    <Card.Body>
                        <div className="img-container text-center pointer" onClick={this.showProduct}>
                            <Card.Img  src={imageurl} />
                        </div>
                        <div className="my-2 d-block text-left font-weight-bold text-danger">
                            <Card.Title>{brand}</Card.Title>
                        </div>
                        <div className="text-left">
                            <ul className="list-style">
                                <li className="font-weight-bold prod-desc hover pointer" id={id} onClick={this.showProduct}>{name}</li>
                                <li className="text-yellow">
                                    <div>
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#ffcf56"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='15px'
                                            starSpacing='1px'
                                            /> 
                                            <span className="py-2 d-inline-block">{rating}</span>
                                        </div>
                                </li>
                                <li className="px-0">{price}</li>
                            </ul>
                        </div>
                        <Button variant="primary"><Link to="/" className="text-white" onClick={this.props.cartDetails}>Add to cart</Link></Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}
export default withRouter(Tile)          