import React, { useState } from 'react';
import fakeAuth from '../../components/FakeAuth';
import { Redirect } from 'react-router-dom';

import './Login.css';


const Login = (props) => {
    const [employeeId, setEmployeeId] = useState("emp001");
    const [password, setPassword] = useState("pass@123");
    const [
        redirectToReferrer,
        setRedirectToReferrer
       ] = React.useState(false)
    
       const login = () => fakeAuth.authenticate(() => {
         setRedirectToReferrer(true)
       })
    
     if (redirectToReferrer === true) {
        return <Redirect to='/challenges' />
     }
     function validateForm() {
        return employeeId.length > 0 && password.length > 0;
    }
    return(
        <>
            <div className="app-login-page">
                <div className="website-logo">
                    Hack Ideas
                </div>
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-item">
                            <div className="form-meta text-center mb-5">
                                <h1>Welcome Back</h1>
                                <p>Enter your credentials to access your account.</p>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter your employee id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-action">
                                <button type="submit" className="btn btn-primary btn-block" disabled={!validateForm()} onClick={login} >Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;