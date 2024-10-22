import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={'Contact us'}>
     
     <div className="row contactus">
      <div className="col-md-6">
        <img src="/images/contactus.jpeg" alt="contactus" style={{width: '100%'}} />
         </div>
         <div className="col-md-4">
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            any query and info about product feel free to call anytime we are 24x7 available
          </p>
          <p className='mt-3'>
            <BiMailSend /> : www.help@commerceapp.com
          </p>
          <p className='mt-3'>
            <BiPhoneCall /> : 0341-0412341
          </p>
          <p className='mt-3'>
            <BiSupport /> : 92302-0662440 (too free)
          </p>
         </div>
     </div>

    </Layout>
  )
}

export default Contact
