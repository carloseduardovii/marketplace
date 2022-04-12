import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addFavoriteThunk, getProductsThunk } from '../redux/actions'
import '../styles/productDetail.css'

const ProductDetail = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const [ recomendProducts, setRecomendProducts ] = useState([])
  const [ rate, setRate ] = useState(0);
  
  const products = useSelector(state => state.products)

  useEffect(() => dispatch(getProductsThunk()), [dispatch])

  const productsFound = products.find(productsItem => productsItem.id === Number(id))
    //console.log(products[0]?.id, id)
    //console.log(productsFound)
    //console.log(productsFound.category)

  useEffect(() => {
    if(productsFound){
      axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productsFound?.category.id}`)
      .then(res => setRecomendProducts(res.data.data.products))
    }
    
  }, [dispatch, productsFound])

  //console.log(recomendProducts)
  const addFavorite = () =>{
    const news = {
      news: id,
      rate: rate
    }
    dispatch(addFavoriteThunk(news))
  }

    
  return (
    <section className='product-detatl'>

      <div className="favorites">
      <div className="input-container">
        <label htmlFor="rate"></label>
        <input type="text" id="rate" value={rate} onChange={e => setRate(e.target.value)}/>
      </div>
        <button onClick={addFavorite}>Add to favorites</button>
      </div>
{/* 
      <h2>e-commerce</h2> */}
      <div className='return-home'>
        <div className='link-home'>
          <Link to="/"><h3>Home </h3></Link>
          <div className='icon-circle'>
            <i class="fa-solid fa-circle"></i>
          </div>
          <article key={productsFound.id}> {productsFound?.title}</article>
        </div>
      </div>
      
     <div className='card-desc'>
     <div className='product-desc'>
          <div className='img-detail'>
            <img src={productsFound?.productImgs[0]} alt="" width={200}/>
          </div>
          <div className='desc-detail'>
            <h3>{productsFound?.title}</h3>
            <p>{productsFound?.description}</p>
            <article>Price</article>
            <p className='price'>$ {productsFound?.price}</p>
            <button>Add to cart <i className="fa-solid fa-cart-shopping"></i></button>
          </div>
      </div>
     </div>
      
    
        <h4>Discover similar products</h4>
      
      <div className='recomend'>
        <ul className='product-recomend'>
          {
            recomendProducts.map(productItem => (
              <div className='product'>
                <Link to={`/product/${productItem.id}`}>
                <div className='product-img'>
                  <img src={productItem.productImgs[0]} alt="" width={190}/>
                </div>
                </Link>
                <div>
                  <h6 key={productItem.id}>
                  {productItem.title}
                    </h6>
                  <div className='purchase-card'>
                    <p>Price $ {productItem.price}</p>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                  
                </div>
              </div>
              
            ))
          }
        </ul>
      </div>    
    </section>
    
  )
}

export default ProductDetail