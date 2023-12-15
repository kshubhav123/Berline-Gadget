import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"


const ProductCard = ({ products }) => {

  const [tooltip, setToolTip] = useState("Click To Add");
  const { user, cart } = useSelector((state) => ({ ...state }))
  let dispatch = useDispatch();

  const handleToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
        console.log("loi", cart);
      }
      // push in cart 
      cart.push({ ...products, count: 1 });
      // remove duplicate
      let unique = _.uniqWith(cart, _.isEqual)
      // save to localstorage 
      console.log("dddd", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("Added")

      dispatch({
        type: "ADD_TO_CART",
        payload: unique
      })

      dispatch({
        type: "SET_VISIBLE",
        payload: true
      })

    }
  }

  const { title, description, images, slug, color, brand, price } = products;

  return (
    <React.Fragment>
      <div className='m-2 text-start'>  {products && products.ratings && products.ratings.length > 0 ? showAverage(products) : <span className="text-primary">No Ratings yet</span>}</div>
      <div className="card rounded-5 border-0 shadow">
        <img height="220" class="card-img-top rounded-4" src={images && images.length ? images[0].url : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"} alt="..." />

        <div class="card-body">
          <div class="h4 card-title text-center capitalize-first">{title}</div>
          <p class="card-text text-center text-justify text-secondary px-3 fs-6">{description.substring(0, 40)}...</p>

          <div className='d-flex justify-content-around mt-4 py-2'>
            <Link to={`/product/${slug}`} className="text-primary fw-bold">View</Link>
            <button className="bg-white border-0 text-primary fw-bold" onClick={handleToCart} disabled={products.quantity < 1}>{products.quantity < 1 ? "Out Of Stock" : "Add to Cart"}</button>
          </div>

          <hr className='mt-0'/>
          <div className='text-center d-flex justify-content-around'>
            <div className='fs-5'>Brand
              <div className='fs-6 mt-2'> {brand.name} </div>
            </div>
            <div className='fs-5'>Color
              <div class="mx-3 rounded-circle mt-3 shadow" style={{ backgroundColor: `${color}`, height: '1.5rem', width: '1.5rem' }}></div>
            </div>
            <div className='fs-5'>Price
              <div class="product_price text-secondary mt-2">{price}</div>
            </div>
          </div>
        </div>

      </div>

    </React.Fragment>
  )
}

export default ProductCard