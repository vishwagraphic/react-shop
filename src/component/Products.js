import React, {Component} from 'react'
import {Alert, Container, Row} from 'react-bootstrap'
import Tile from './common/Tile'

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products : []
        };
    }
    
    componentDidMount(){
        let params = new URLSearchParams(document.location.search.substring(1))
        let paramsType = params.get("type")
        Promise.all([fetch('https://vue-react-server.herokuapp.com/products?type=' + paramsType)])
        .then(([res1]) => { 
            return Promise.all([res1.json()]) 
        })
        .then(([res1]) => {
            imgurlExtract(res1, 'deals')
            this.setState({products : res1})
        });
        function imgurlExtract(products) {
            let imgArr = []
            products.forEach((product, index) => {
                imgArr = product.imageurls.split(',')
                for (let i = 0; i < imgArr.length; i++) {
                    if (imgArr[i].indexOf('bbystatic') > -1) {
                        products[index].imageurls = imgArr[i]
                    }
                }
            });
        }
    }
    
    render(){
        const ProductTileArr = this.state.products.map((data, i) => {
            return <Tile cartDetails={() => this.props.cartDetails(1, data.productid)} key={i} id={data.productid} price={data.prices_amountmin} name={data.name}
                        brand={data.brand} imageurl={data.imageurls} rating={data.rating} /> 
        });

        return(
            <div className="mb-3">
                <div className="container">
                    <Alert variant="info" className="clearfix mt-3" >
                        <span className="d-inline-block py-1 mr-auto font-weight-bold">All Deals</span>
                    </Alert>
                    <Container className="text-center">
                        <Row>
                            {ProductTileArr}
                        </Row>
                    </Container>
                </div>
            </div>    
        )
    }
}

export default AllProducts;