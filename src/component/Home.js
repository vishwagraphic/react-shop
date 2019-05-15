import React, {Component} from 'react'
import Mycarousel from './common/Mycarousel'
import {Alert, Button, Container, Row} from 'react-bootstrap'
import Tile from './common/Tile'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dealProducts: [],
          lowCostProducts: []
        };
    }
    
    componentDidMount(){
        Promise.all([fetch('http://localhost:8081/dealsProducts'), fetch('http://localhost:8081/lowCostProducts')])
        .then(([res1, res2]) => { 
            return Promise.all([res1.json(), res2.json()]) 
        })
        .then(([res1, res2]) => {
            imgurlExtract(res1, 'deals')
            imgurlExtract(res2, 'lowcost')
            this.setState({dealProducts : res1})
            this.setState({lowCostProducts : res2})
        });
        function imgurlExtract(products, type) {
            let imgArr = []
            console.log(products[1].imageurls)
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
        const DealsTileArr = this.state.dealProducts.map((data, i) => {
            return <Tile key={i} id={data.productid} price={data.prices_amountmin} name={data.name}
                        brand={data.brand} imageurl={data.imageurls} rating={data.rating} /> 
        });

        const lowCostTileArr = this.state.lowCostProducts.map((data, i) => {
            return <Tile key={i} id={data.productid} price={data.prices_amountmin} name={data.name}
                        brand={data.brand} imageurl={data.imageurls} rating={data.rating} /> 
        });
        
        return(
            <div className="mb-3">
                <Mycarousel />
                <div className="container">
                    <Alert variant="info" className="clearfix mt-3" >
                        <span className="d-inline-block py-1 mr-auto font-weight-bold">Deal of the Day</span>
                        <Button variant="danger" className="display-inline float-right">Show All</Button>
                    </Alert>
                    <Container className="text-center">
                        <Row>
                            {DealsTileArr}
                        </Row>
                    </Container>
                    <Alert variant="success" className="clearfix mt-3" >
                        <span className="d-inline-block py-1 mr-auto font-weight-bold">Low-cost Items</span>
                        <Button variant="danger" className="display-inline float-right">Show All</Button>
                    </Alert>
                    <Container className="tc">
                        <Row>
                            {lowCostTileArr}
                        </Row>
                    </Container>
                </div>
            </div>    
        )
    }
}

export default Home;