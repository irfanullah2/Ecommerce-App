import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import '../../styles/AuthStyles.css';

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate = useNavigate();
  
    // form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://ecommerce-app-server-topaz.vercel.app/register',
               { name, email, phone, password, address , answer });
            if (res.data.success) {
                toast.success(res.data.message);  // Success message
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
    <Layout title={'Register - Ecommerce App'}>
     <div className="form-container">
     <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' required className="form-control" id="exampleInputName" />
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' required className="form-control" id="exampleInputEmail" />
  </div>
  <div className="mb-3">
    <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Phone' required className="form-control" id="exampleInputPhone" />
  </div>
  <div className="mb-3">
    <input  type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className="form-control" id="exampleInputPassword" />
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter Address' required className="form-control" id="exampleInputAddress" />
  </div>
 
  <div className="mb-3">
    <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder='What is Your Name ? ' required className="form-control" id="exampleInputAddress" />
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

     </div>
    </Layout>
  )
}

export default Register
