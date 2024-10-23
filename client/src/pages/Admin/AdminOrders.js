import React, { useState ,  useEffect } from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/auth';
import moment from 'moment'
import axios from 'axios';

import { Select } from 'antd';
const {Option} = Select;

const AdminOrders = () => {
    const [status , setStatus] = useState(['Not Process', 'Processing' , 'Shipped' , 'deleiverd' , 'cancel'])
    const [changeStatus , setChangeStatus] = useState('')
    const [orders , setOrders] = useState([]);
    const [auth , setAuth] = useAuth();
   
   
   const getOrders = async () => {
        try {
            // Full backend URL for the API request
            const { data } = await axios.get('https://ecommerce-app-server1.vercel.app/api/v1/auth/all-orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(()=>{
      if(auth?.token) getOrders();
    } , [auth?.token]);
    

    // handle order Update
     const handleChange = async (orderId, value) => {
        try {
            // Full backend URL for updating the order status
            const { data } = await axios.put(`https://ecommerce-app-server1.vercel.app/api/v1/auth/order-status/${orderId}`, { status: value });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Layout title={'All Orders Data'}>
      <div className="row dashboard">
        <div className="col-md-3">
            <AdminMenu />
        </div>

        <div className="col-md-9">
            <h1 className='text-center'>All Orders </h1>
            {
                orders?.map((o, i) => {
  return (
    <div className="border shadow" key={i}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Buyer</th>
            <th scope="col">Date</th>
            <th scope="col">Payment</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr> 
            <td>{i + 1}</td>
            <td>
              <Select
              variant='false'
                onChange={(value) => handleChange(o._id , value)}
                defaultValue={o?.status}
              >
                {status.map((s, i) => (
                  <Option key={i} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </td>
            <td>{o?.buyer?.name}</td>
            <td>{moment(o?.createdAt).fromNow()}</td>
            <td>{o?.payment.success ? "Success" : "Failed"}</td>
            <td>{o?.products?.length}</td>
          </tr> {/* Closed <tr> tag */}
        </tbody>
      </table>

      {/* Products show */}
      <div className="container">
        {o?.products?.map((p, i) => (
          <div className="row card mb-2 p-3 flex-row" key={p._id}>
            <div className="col-md-4">
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                width={"100px"}
                height={"150px"}
              />
            </div>
            <div className="col-md-8">
              <p>{p.name}</p>
              <p>{p?.description ? p.description.substring(0, 30) : "No description available"}</p>
              <p>Price: {p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
})

                  }


             
        </div>
      </div>
    </Layout>
  )
}

export default AdminOrders







