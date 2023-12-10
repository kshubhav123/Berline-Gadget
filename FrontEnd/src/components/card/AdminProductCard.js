import React from 'react'
import { Link } from 'react-router-dom';

const AdminProductCard = ({ products, handleRemove }) => {

  const { title, images, slug,  quantity, brand, price, shipping, color } = products;

  return (
    <React.Fragment>

      <td>
        <img src={images && images.length ? images[0].url : "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png"} className="card-img-top rounded-2" alt="..." style={{ height: "4rem", width: "4rem" }} />
      </td>
      <td className='pt-2'>
        <div className='fs-6 fw-bold'>{title} </div>
        <div className='text-secondary'>{brand.name} </div>
      </td>      

      <td className='fs-6 fw-bold'>  ₹ {price}</td>
      <td className='fs-6'>{quantity}</td>
      <td className='fs-6'>{shipping}</td>
      <td className=''>
        <div style={{ backgroundColor: color }} className='p-2 border rounded'>  </div>
      </td>
      <td>
        <Link to={`/admin/products/${slug}`} className='btn text-success'> <i class="fa fa-edit"></i></Link>
        <button className='btn text-danger' onClick={() => handleRemove(slug)}> <i class="fa fa-trash"></i> </button>
      </td>
    </React.Fragment>
  )
}

export default AdminProductCard;