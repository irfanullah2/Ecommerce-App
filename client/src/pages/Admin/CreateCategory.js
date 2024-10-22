import React, {useEffect , useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'

const CreateCategory = () => {

  const [categories , setCategories] = useState([]);
  const [ name , setName] = useState('');
  const [visible , setVisible] = useState(false)
  const [ selected , setSelected] = useState(null)
  const [updatedName , setUpdatedName] = useState('')

  // Handle Create Form
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/category/create-category' , {name})
      if (data?.success) {
        toast.success(`${name} is Created`)
        setName('')
        getAllCategory();
      }
      else{
     toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong in Input Form')
    }
  }


// get all Cat
const getAllCategory = async()=>{
  try {
    const {data} = await axios.get('/api/v1/category/get-category')
    if (data?.success) {
      setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
    toast.error('Something went Wrong in Getting Categories')
  }
}
useEffect(()=>{
  getAllCategory();
}, [])

//Update Category
const handleUpdate =async(e)=>{
e.preventDefault();
try {
  const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}` , {name:updatedName})
  if (data.success) {
    toast.success(`${updatedName} is Updated Category`);
    setSelected(null);
    setUpdatedName('');
    setVisible(false);
    getAllCategory();
  }
  else{
    console.log('something went wrong in handle Update')
    toast.error('data.message');
  }
} catch (error) {
  console.log(error)
  toast.error('Something went wrong in Updating Category')
}
};
//Delete Category
const handleDelete =async(pid)=>{
  try {
    const {data} = await axios.delete(`/api/v1/category/delete-category/${pid}`)
    if (data.success) {
      toast.success(`Category is Deleted`);
      getAllCategory();
    }
    else{
      console.log('something went wrong in handle Delete')
      toast.error('data.message');
    }
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong in Deleting Category')
  }
  }

  return (
    <Layout title='Dashboard - Create Category'>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
            <AdminMenu />
        </div>
        <div className="col-md-9">
      <h2> Manage Category </h2>
      <div className="p-3 w-50">
        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
      </div>
      <div className='w-75'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
          {categories?.map((c)=>(
            <>
              <tr>
                <td key={c._id}>{c.name}</td>
                <td>
                  <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}}  >Edit</button>
                  <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                </td>
              </tr>
            </>
          ))}
            <tr>

            </tr>
          </tbody>
        </table>
      </div>
        </div>
        <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible} >
             <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
        </Modal>
    </div>
    </div>
    </Layout>
  )
}

export default CreateCategory
