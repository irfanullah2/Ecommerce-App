import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import '../../styles/AuthStyles.css';

const ForgotPassword = () => {
    
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')

  const navigate = useNavigate();
  

  // form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ecommerce-app-server-topaz.vercel.app/forgot-password',
         { 
            email,
            newPassword,
            answer,
         });
      if (res.data.success) {
        toast.success(res.data && res.data.message);  // Success message
       
        navigate('/login');
      } else {
        toast.error(res.data.message);  // Error message
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');  // General error message
    }
  };

  return (
    <Layout title={'Forgot Password - Ecommerce App'}>
      <h2>Forgot Password </h2>
      <div className="form-container">
        <h1>Reset Page</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required className="form-control" id="exampleInputEmail" />
          </div>
          <div className="mb-3">
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='What is your favourite Sports' required className="form-control" id="exampleInputEmail" />
          </div>
          <div className="mb-3">
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' className="form-control" id="exampleInputPassword" />
          </div>
         
          <button type="submit" className="btn btn-primary">RESET </button>
        </form>

      </div>
    </Layout>
  )
}

export default ForgotPassword
