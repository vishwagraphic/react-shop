import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Form, Button, Container, Spinner} from 'react-bootstrap'
import { signInEmailChange, signInPasswordChange, signInErrChange, userDetails, responseLoader } from '../redux/actions';

const mapStateToProps = state => {
    return{
        signInEmail: state.signInEmailChange.signInEmail,
        signInPassword : state.signInPasswordChange.signInPassword,
        signInErr : state.signInErrChange.signInErr,
        user: {
            id: state.userDetails.user.id,
            name: state.userDetails.user.name,
            email: state.userDetails.user.email
        },
        signIn : state.userDetails.signIn,
        loading: state.responseLoader.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onEmailChange : event => dispatch(signInEmailChange(event.target.value)),
        onPasswordChange : event => dispatch(signInPasswordChange(event.target.value)),
        onSignInErrChange : val => dispatch(signInErrChange(val)),
        onUserDetails : (user, status) => dispatch(userDetails(user, status)),
        onResponseLoader : val => dispatch(responseLoader(val))
    }
}

class Signin extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onResponseLoader(true)
        if(this.props.signInEmail !== '' && this.props.signInPassword !== ''){
            fetch('https://vue-react-server.herokuapp.com/signIn', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    email: this.props.signInEmail,
                    password : this.props.signInPassword
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.name){
                    localStorage.setItem('username', user.name)
                    localStorage.setItem('userid', user.id)
                    localStorage.setItem('useremail', user.email)
                    this.props.onResponseLoader(false)
                    this.props.onUserDetails(user, true)
                    this.props.loadUser(user, true)
                    this.props.history.push('/')
                }
            })
            .catch(() => {
                this.props.onResponseLoader(false)
                this.props.onSignInErrChange(true)
            })
        }
    }
    render(){
        const {onEmailChange, onPasswordChange, signInErr} = this.props
        let signInErrMsg
        if(signInErr){
            signInErrMsg = <p className="text-danger">You have entered invalid username or password</p>
        } else {
            signInErrMsg = <p className="text-danger"></p>
        }
        return(              
            <div className={this.props.loading ? 'mb-3 loading-icon' : 'mb-3'} >
                <Spinner animation="border" role="status" className="spinner-loading" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <Container className='container my-5 form-width'>
                    <div>{signInErrMsg}</div>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" onChange={onEmailChange} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" autoComplete="passsword" onChange={onPasswordChange} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="button" className="my-2 mb-4 w-100">
                            <Link to="/" className="text-white" onClick={this.handleSubmit}>Signin</Link>
                        </Button>
                        <p className="mb-0">New user? Please register here</p>
                        <Button variant="secondary" type="button" className="my-2 w-100">
                            <Link to="/register" className="text-white">Register</Link>
                        </Button>
                    </Form>
                </Container>
            </div>    
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin))