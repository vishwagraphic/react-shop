import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Alert, Container, Row, Spinner} from 'react-bootstrap'
import Tile from './common/Tile'
import { responseLoader } from './../redux/actions'

const mapStateToProps = state => {
    return{
        loading: state.responseLoader.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        onResponseLoader : val => dispatch(responseLoader(val))
    }
}

class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products : []
        };
    }
    
    componentDidMount(){
        this.props.onResponseLoader(true)
        let params = new URLSearchParams(document.location.search.substring(1))
        let paramsType = params.get("type")
        Promise.all([fetch('https://vue-react-server.herokuapp.com/products?type=' + paramsType)])
        .then(([res]) => { 
            return Promise.all([res.json()]) 
        })
        .then(([res]) => {
            imgurlExtract(res, 'deals')
            this.setState({products : res})
            this.props.onResponseLoader(false)
        })
        .catch(err => {
            console.log(err)
            this.props.onResponseLoader(false)
        })
        function imgurlExtract(products) {
            let imgArr = []
            products.forEach((product, index) => {
                if(index !== 0){
                    imgArr = product.imageurls.split(',')
                    for (let i = 0; i < imgArr.length; i++) {
                        if (imgArr[i].indexOf('bbystatic') > -1) {
                            products[index].imageurls = imgArr[i]
                        }
                    }
                }
            });
        }
    }
    
    render(){
        const ProductTileArr = this.state.products.map((data, i) => {
            if(i !== 0){
                return <Tile cartDetails={() => this.props.cartDetails(1, data.productid)} key={i} id={data.productid} price={data.prices_amountmin} name={data.name}
                        brand={data.brand} imageurl={data.imageurls} rating={data.rating} /> 
            } else{
                return ''
            }
        });
        const ProductType = this.state.products[0] !== undefined ? this.state.products[0].type : ''

        return(
            <div className={this.props.loading ? 'loading-icon mb-3' : ' mb-3'}>
                <Spinner animation="border" role="status" className="spinner-loading" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <div className="container">
                    <Alert variant="info" className="clearfix mt-3" >
                        <span className="d-inline-block py-1 mr-auto font-weight-bold">{ProductType}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)