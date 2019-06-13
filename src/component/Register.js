import {Link, withRouter} from 'react-router-dom';
import React, {Component} from 'react'
import {Form, Button, Container} from 'react-bootstrap'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            RegisterName: '',
            RegisterEmail: '',
            RegisterPassword: '',
            errors: {
                fullName: '',
                email: '',
                password: '',
                mainErr: ''
            },
            RegisterErr: false
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state)
        if(this.state.errors.fullName !== '' && this.state.RegisterEmail !== '' && this.state.RegisterPassword !== ''){
            this.setState({errors: {mainErr : ''}})
            fetch('https://vue-react-server.herokuapp.com/register', {
                method: 'post',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name: this.state.RegisterName,
                    email: this.state.RegisterEmail,
                    password : this.state.RegisterPassword
                })
            })
            .then(response => {
                if(response.status === 200){
                    this.setState({RegisterErr: false})
                    this.props.history.push('/signin')
                }else{
                    this.setState({RegisterErr: true})
                }
            })
            .catch(err => console.log('WHAT ERRR' + err))
        } else {
            this.setState({errors: {mainErr : 'Please fill all the fields'}})
        }
    }
    onInputChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        switch (name) {
            case 'name':
                this.setState({RegisterName : event.target.value})
                if(value.length < 5){
                    this.setState({errors : {fullName : 'Please enter your full name'}})
                }else{
                    this.setState({errors : {fullName : ''}})
                }
                break;
            case 'email':
                this.setState({RegisterEmail : event.target.value})
                if(this.emailValidator.test(value)){
                    this.setState({errors : {email : ''}})
                }else{
                    this.setState({errors : {email : 'Please enter valid email address'}})
                }
                break;
            case 'password':
                this.setState({RegisterPassword : event.target.value})
                if(value.length < 8){
                    this.setState({errors : {password : 'Password must be 8 characters long!'}})
                }else{
                    this.setState({errors : {password : ''}})
                }
                break;
            default:
                break
        }
    }
    emailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    /* onNameChange = (event) => {
        this.setState({RegisterName : event.target.value})
        console.log(this.state.RegisterName)
    }
    onEmailChange = (event) => {
        this.setState({RegisterEmail : event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({RegisterPassword : event.target.value})
    } */
    render(){
        let registerErrMsg
        if(this.state.RegisterErr){
            registerErrMsg = <p>User already exist</p>
        }else{
            registerErrMsg = <p></p>
        }
        return(
            <div className="mb-3">
                
                <Container className='container my-5 form-width'>
                    <div className="text-danger">{registerErrMsg}</div>
                    <div className="text-danger">{this.state.errors.mainErr}</div>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control type="text" name="name" onChange={this.onInputChange} placeholder="Enter name" />
                            <p className="text-danger pt-2">{this.state.errors.fullName}</p>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.onInputChange}  placeholder="Enter email" />
                            <p className="text-danger pt-2">{this.state.errors.email}</p>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" autoComplete="password" name="password" onChange={this.onInputChange}  placeholder="Enter Password" />
                            <p className="text-danger pt-2">{this.state.errors.password}</p>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="my-2 w-100">
                            <Link to="/" className="text-white" onClick={this.handleSubmit}  >Register</Link>
                        </Button>
                    </Form>
                </Container>
            </div>    
        )
    }   

}
export default withRouter(Register)