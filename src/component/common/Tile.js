import React from 'react'
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import {Button, Card, Col} from 'react-bootstrap'



const Tile = ({id, name, brand, imageurl, rating, price}) => {
    return(
       <Col>
            <Card className="mb-2">
                <Card.Body>
                    <div className="img-container text-center">
                        <Card.Img  src={imageurl} />
                    </div>
                    <div className="my-2 d-block text-left font-weight-bold text-danger">
                        <Card.Title>{brand}</Card.Title>
                    </div>
                    <div className="text-left">
                        <ul className="list-style">
                            <li className="font-weight-bold prod-desc" id={id}>{name}</li>
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
                    <Button variant="primary"><Link to="/" className="text-white">Show All</Link></Button>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default Tile                        