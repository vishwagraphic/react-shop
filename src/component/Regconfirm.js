import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Regconfirm = () => {
    return(
        <div className="container text-center">
            <h2 className="my-4">Thank you for registering. </h2>
            <h4>Please login to your account by <Link to="/Signin" >Sign in</Link></h4>
        </div>    
    )
}

export default withRouter(Regconfirm)