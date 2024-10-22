import React , {useState , useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {

  // context
 const [auth , setAuth] = useAuth();
  // state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')


  // get user data
  useEffect(()=>{
    const {name , email , phone , address} = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  } , [auth?.user])

      // form Submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put('/api/v1/auth/profile',
               { 
                name,
                 email,
                  phone,
                   password,
                    address
                    });
                    if (data?.error) {
                      toast.error(data?.error)
                    }
                    else{
                      setAuth({...auth , user: data?.updatedUser });
                      let ls = localStorage.getItem('auth');
                      ls = JSON.parse(ls);
                      ls.user = data.updatedUser;
                      localStorage.setItem('auth' , JSON.stringify(ls));
                      toast.success('Profile Updated Successfully');

                    }
            
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');  // General error message
        }
    };
    

  return (
    <Layout title='Dashboard -Your Profile'>
    <div className="container-fluid p-3 m-3">
      <div className="row">
          <div className="col-md-3">
              <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h4 className='title'>USER PROFILE</h4>
<div className="mb-3">
  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'  className="form-control" id="exampleInputName" />
</div>
<div className="mb-3">
  <input type="email" disabled value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'  className="form-control" id="exampleInputEmail" />
</div>
<div className="mb-3">
  <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter Phone'  className="form-control" id="exampleInputPhone" />
</div>
<div className="mb-3">
  <input  type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className="form-control" id="exampleInputPassword" />
</div>
<div className="mb-3">
  <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter Address'  className="form-control" id="exampleInputAddress" />
</div>

<button type="submit" className="btn btn-primary">Update</button>
</form>

            </div>
          </div>
      </div>
    </div>
  </Layout>
  )
}

export default Profile
