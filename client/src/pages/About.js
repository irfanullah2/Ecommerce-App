import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout title={'About us'} >
     <div className="row aboutus">
      <div className="col-md-6">
        <img src="/images/about.jpeg" alt="about us" style={{width:'100%'}} />
        </div>
     <div className="col-md-4">
      <p className='text-justify mt-2'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni repudiandae, consectetur nisi asperiores debitis molestiae ex vero doloribus expedita perferendis in voluptas nobis libero quod at sit beatae harum eum.
      </p>
    </div>
   
   </div>

    </Layout>
  )
}

export default About
