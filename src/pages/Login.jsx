import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import loginimage from '../assets/images/logo.png'
import '../assets/styles/login.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthProvider';
import { toast } from 'react-hot-toast';
import {useLoginMutation} from '../hooks/auth/login';
import ForgotPasswordModal from '../components/modal/forgotPassword';
import { extractLoginUser } from '../utils/authUser';


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
      const response = await loginMutation.mutateAsync({
        email: email.trim(),
        password,
      });
      response && console.log('Login response:', response);
      if (response?.success && response?.data?.accessToken && response?.data?.refreshToken) {
        const user = extractLoginUser(response.data, email.trim());
        await login({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user,
        });
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(response?.message || 'Login failed: Invalid response');
        console.error('Login failed: Invalid response', response);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        (err.message?.includes('Network')
          ? 'Unable to reach the server. Please try again.'
          : 'Login failed. Please check your credentials.');
      toast.error(errorMsg);
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
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
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