import { FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILED,
    SIGNIN_EMAIL, SIGNIN_PASSWORD, SIGNIN_ERR } from './constants'
const intialProductState = {
    dealProducts: [],
    lowCostProducts: []
}

export const fetchProducts = (state = intialProductState, action= {}) => {
    switch(action.type){
        case FETCH_PRODUCTS_PENDING:
            return Object.assign({}, state, {isPending: true, dealProducts: [], lowCostProducts: []})
        case FETCH_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {dealProducts: action.payload[0], lowCostProducts: action.payload[1], isPending: false})
        case FETCH_PRODUCTS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false})
        default:
            return state;
    }
}

const intialSignEmailState = {
    signInEmail: ''
}
const intialSignPasswordState = {
    signInPassword: ''
}

const intialSignErrState = {
    signInErr: false
}

export const signInEmailChange = (state = intialSignEmailState, action = {}) => {
    switch (action.type){
        case SIGNIN_EMAIL:
            return Object.assign({}, state, {signInEmail : action.payload})
        default:
            return state;
    }
}

export const signInPasswordChange = (state = intialSignPasswordState, action = {}) => {
    switch (action.type){
        case SIGNIN_PASSWORD:
            return Object.assign({}, state, {signInPassword : action.payload})
        default:
            return state;
    }
}

export const signInErrChange = (state = intialSignErrState, action = {}) => {
    switch (action.type){
        case SIGNIN_ERR:
            return Object.assign({}, state, {signInErr : action.payload})
        default:
            return state;
    }
}