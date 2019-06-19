import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILED,
SIGNIN_EMAIL, SIGNIN_PASSWORD, SIGNIN_ERR, FETCH_USER_DETAILS, FETCH_CART_DETAILS, RESPONSE_LOADER } from './constants'

export const fetchProducts = (msg, data) => (dispatch) =>  {
    if(msg === 'pending'){
        dispatch({type : FETCH_PRODUCTS_PENDING})
    }else if(msg === 'success'){
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: data
        })
    }else if(msg === 'failed'){
        dispatch({type: FETCH_PRODUCTS_FAILED, payload: data})
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

export const responseLoader = (val) => ({
    type: RESPONSE_LOADER,
    payload : val
})