import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap'

class Signin extends Component {
    constructor(props){
        super(props)
        this.state = {
            signInEmail :'',
            signInPassword :'',
            signInErr: false
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.signInEmail !== '' && this.state.signInPassword !== ''){
            fetch('http://localhost:8081/signIn', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    email: this.state.signInEmail,
                    password : this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(user => {
                if(user.name){
                    this.props.loadUser(user, true)
                    localStorage.setItem('username', user.name)
                    localStorage.setItem('userid', user.id)
                    localStorage.setItem('useremail', user.email)
                    this.props.history.push('/')
                }
            })
            .catch(() => this.setState({signInErr : true}))
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword:event.target.value})
    }
    render(){
        let signInErrMsg
        if(this.state.signInErr){
            signInErrMsg = <p className="text-danger">You have entered invalid username or password</p>
        } else {
            signInErrMsg = <p className="text-danger"></p>
        }
        return(              
            <div className="mb-3">
                <Container className='container my-5 form-width'>
                    <div>{signInErrMsg}</div>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" onChange={this.onEmailChange} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" autoComplete="passsword" onChange={this.onPasswordChange} placeholder="Password" />
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

export default withRouter(Signin)