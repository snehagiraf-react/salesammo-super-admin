import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import loginimage from '../assets/images/logo.png'
import '../assets/styles/login.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { AuthContext } from '../features/auth/AuthProvider';    
import { toast } from 'react-hot-toast';
import {useLoginMutation} from '../hooks/auth/login';
import ForgotPasswordModal from '../components/modal/forgotPassword';


const Login = () => {

    const{login, isAuthenticated} = useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isForgotModalOpen, setIsForgotModalOpen] = React.useState(false);

    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await login({ accessToken: 'demo-access-token', refreshToken: 'demo-refresh-token' });
    //     navigate('/dashboard', { replace: true });
    // };

    React.useEffect(() => {
        if(isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
        
    }, [isAuthenticated, navigate]);



     const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      response && console.log('Login response:', response);
      if (response?.success && response?.data?.accessToken && response?.data?.refreshToken) {
        await login({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Login failed: Invalid response');
        console.error('Login failed: Invalid response', response);
      }
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login failed', err);
    }
  };


  return (
    <>
    <div className='login-section'>
        <div className='login-card'>
            <img src={loginimage} alt="Login" className='login-image' />

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='login-btn'>
                    <button type="submit" className='CommonButton' style={{width:"100%"}}>Login</button>
                </div>

                <div className='forgotpsw'>
                    <span onClick={() => setIsForgotModalOpen(true)} style={{width:"100%", cursor:"pointer"}}>Forgot Password?</span>
                </div>

            </form>
            <ForgotPasswordModal 
                isOpen={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
            />
        </div>
    </div>
    </>
  )
}

export default Login