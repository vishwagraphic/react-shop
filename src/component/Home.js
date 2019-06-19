import React, {Component} from 'react'
import {connect} from 'react-redux'
import Mycarousel from './common/Mycarousel'
import {Alert, Button, Container, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import Tile from './common/Tile'
import { fetchProducts } from './../redux/actions'

const mapStateToProps = state => {
    if(state.fetchProducts.isPending === false) {
        return{
            dealProducts: state.fetchProducts.dealProducts,
            isPending : state.fetchProducts.isPending ,
            lowCostProducts: state.fetchProducts.lowCostProducts,
            error: state.fetchProducts.error
        }
    }else {
        return {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchProducts : (msg, data) => dispatch(fetchProducts(msg, data))
    }
}

class Home extends Component {
    componentWillMount(){
        this.props.onFetchProducts('pending')
        Promise.all([fetch('https://vue-react-server.herokuapp.com/dealsProducts'), fetch('https://vue-react-server.herokuapp.com/lowCostProducts')])
        .then(([res1, res2]) => { 
            return Promise.all([res1.json(), res2.json()]) 
        })
        .then(([res1, res2]) => {
            imgurlExtract(res1, 'deals')
            imgurlExtract(res2, 'lowcost')
            this.props.onFetchProducts('success', [res1, res2])
        })
        .catch(error => this.props.onFetchProducts('failed', error))
        function imgurlExtract(products, type) {
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
        const {dealProducts, isPending, lowCostProducts, error, cartDetails} = this.props
        let DealsTileArr, lowCostTileArr
        if(dealProducts !== undefined && lowCostProducts !== undefined){
            DealsTileArr = dealProducts.map((data, i) => {
                return <Tile cartDetails={() => cartDetails(1, data.productid)} key={i} id={data.productid} price={data.prices_amountmin} name={data.name}
                            brand={data.brand} imageurl={data.imageurls} rating={data.rating} />
            })
            
            lowCostTileArr = lowCostProducts.map((data, i) => {
                return <Tile cartDetails={() => cartDetails(1, data.productid)} key={i} id={data.productid} price={data.prices_amountmin} name={data.name}
                            brand={data.brand} imageurl={data.imageurls} rating={data.rating} /> 
            })
        }
       
        return(
            isPending ? 'Loading' : error ? 'Error' :
            <div className="mb-3">
                <Mycarousel />
                <div className="container">
                    <Alert variant="info" className="clearfix mt-3" >
                        <span className="d-inline-block py-1 mr-auto font-weight-bold">Deal of the Day</span>
                        <Button variant="danger" className="display-inline float-right"><Link className="text-white" to="/products?type=dealProducts">Show All</Link></Button>
                    </Alert>
                    <Container className="text-center">
                        <Row>
                            {DealsTileArr}
                        </Row>
                    </Container>
                    <Alert variant="success" className="clearfix mt-3" >
                        <span className="d-inline-block py-1 mr-auto font-weight-bold">Low-cost Items</span>
                        <Button variant="danger" className="display-inline float-right"><Link className="text-white" to="/products?type=lowCostProducts">Show All</Link></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);