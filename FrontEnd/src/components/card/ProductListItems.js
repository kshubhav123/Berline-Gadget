import React from 'react'
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';

const ProductListItems = ({ product }) => {
  const {
    title,
    description,
    price,
    category,
    sub,
    shipping,
    color,
    brand, 
    quantity,
    sold,
  } = product;

  return (


    <>
      <ul className='list-unstyled my-2'>
        <li>
          <span className="labelsmall label-default label-pill pull-xs-right">
            {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <span className="text-danger">No Ratings yet</span>}
          </span>
        </li>
        <li className='fs-3'>
          {title}
        </li>
        <li className='text-secondary fs-5 my-2'>
          {description}
        </li>
        <li className='fs-4'>
          ₹ {price}
        </li>



      </ul>

    
    </>
  )
    ;
};


export default ProductListItems