import React , {useState , useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useParams , useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../styles/CategoryProductStyles.css';


const CategoryProduct = () => {
const params = useParams();
const navigate = useNavigate();
const [products , setProducts] = useState([])
const [category , setCatgory] = useState([]);

useEffect(()=>{
    if(params?.slug) getProductsByCat();
} ,[params?.slug])

// cat wise Products
const getProductsByCat = async()=>{
    try {
        const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
        setProducts(data?.products);
        setCatgory(data?.category);
    } catch (error) {
        console.log(error)
    } 
}


  return (
    <Layout>
      <div className="container mt-3">
        <h2 className='text-center'>Category - {category?.name}</h2>
        <h5 className='text-center'>{products?.length} result found </h5>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                /> 
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button onClick={()=>navigate(`/product/${p.slug}`)}
                   class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
