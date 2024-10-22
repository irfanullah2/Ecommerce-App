import { React, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Register = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password, });
      if (res.data.success) {
        toast.success(res.data && res.data.message);  // Success message
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state||'/');
      } else {
        toast.error(res.data.message);  // Error message
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');  // General error message
    }
  };


  return (
    <Layout title={'Login - Ecommerce App'}>
      <div className="form-container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required className="form-control" id="exampleInputEmail" />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' className="form-control" id="exampleInputPassword" />
          </div>
          <div className="mb-3">
          <button type="button" onClick={()=>{navigate('/forgot-password')}} className="btn btn-primary">Forgot Password</button>

          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register
