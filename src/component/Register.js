import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            RegisterName: '',
            RegisterEmail: '',
            RegisterPassword: ''
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state)
        if(this.state.RegisterName !== '' && this.state.RegisterEmail !== '' && this.state.RegisterPassword !== ''){
            fetch('http://localhost:8081/register', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name: this.state.RegisterName,
                    email: this.state.RegisterEmail,
                    password : this.state.RegisterPassword
                })
            })
            .then(response => response.json())
            .then(res => {
                console.log('FAILEDD '+ res)
                if(res.name){
                    console.log(res)
                    this.props.history.push('/signin')
                }
            })
            .catch(err => console.log(err))
        }
    }
    onNameChange = (event) => {
        this.setState({RegisterName : event.target.value})
        console.log(this.state.RegisterName)
    }
    onEmailChange = (event) => {
        this.setState({RegisterEmail : event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({RegisterPassword : event.target.value})
    }
    render(){
        return(
            <div className="mb-3">
                <Container className='container my-5 form-width'>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control type="text" onChange={this.onNameChange} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" onChange={this.onEmailChange}  placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={this.onPasswordChange}  placeholder="Enter Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="my-2">
                            <Link to="/" className="text-white" onClick={this.handleSubmit}  >Register</Link>
                        </Button>
                    </Form>
                </Container>
            </div>    
        )
    }   
}

export default withRouter(Register)