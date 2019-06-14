import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILED,
SIGNIN_EMAIL, SIGNIN_PASSWORD, SIGNIN_ERR, FETCH_USER_DETAILS, FETCH_CART_DETAILS } from './constants'

export const fetchProducts = (user, status) => (dispatch) =>  {
    dispatch({type : FETCH_PRODUCTS_PENDING});
    Promise.all([fetch('https://vue-react-server.herokuapp.com/dealsProducts'), fetch('https://vue-react-server.herokuapp.com/lowCostProducts')])
        .then(([res1, res2]) => { 
            return Promise.all([res1.json(), res2.json()]) 
        })
        .then(([res1, res2]) => {
            imgurlExtract(res1, 'deals')
            imgurlExtract(res2, 'lowcost')
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: [res1, res2]
            })
        })
        .catch(error => dispatch({type: FETCH_PRODUCTS_FAILED, payload: error}))
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

export const signInEmailChange = (text) => ({
    type: SIGNIN_EMAIL,
    payload : text
})

export const signInPasswordChange = (text) => ({
    type: SIGNIN_PASSWORD,
    payload : text
})

export const signInErrChange = (val) => ({
    type: SIGNIN_ERR,
    payload : val
})

export const userDetails = (user, status) => (dispatch) => {
    dispatch({
        type: FETCH_USER_DETAILS,
        payload: [user, status]
    })
}

export const cartDetails = (cart) => (dispatch) => {
    dispatch({
        type: FETCH_CART_DETAILS,
        payload: cart
    })
}