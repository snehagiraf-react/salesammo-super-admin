import React from 'react'
import { useNavigate } from 'react-router-dom';
import loginimage from '../assets/images/logo.png'
import '../assets/styles/login.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';


const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ accessToken: 'demo-access-token', refreshToken: 'demo-refresh-token' });
        navigate('/dashboard', { replace: true });
    };

  return (
    <>
    <div className='login-section'>
        <div className='login-card'>
            <img src={loginimage} alt="Login" className='login-image' />

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Username" />
                </div>
                <div>
                    <input type="password" placeholder="Password" />
                </div>
                <div className='login-btn'>
                    <button type="submit" className='CommonButton' style={{width:"100%"}}>Login</button>
                </div>

                <div className='forgotpsw'>
                    <Link to="/forgot-password" style={{width:"100%"}}>Forgot Password?</Link>
                </div>

            </form>
        </div>
    </div>
    </>
  )
}

export default Login