import React, { useEffect, useState } from 'react'
import ProductCard from '../components/card/ProductCard'
import { useParams } from 'react-router-dom';
import { getbrandproduct } from '../functions/product';

const Shoplist = () => {
    const { brand } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const loadProduct = async() => {
           await getbrandproduct(brand).then((res) => setProduct(res.data));
        }
        loadProduct();
    }, [brand])

    console.log(product,"11111");

    return (
        <> 
            <div className='container mt-4'>
                <div className='row'>
                <div className='fs-3 fw-bold '> {brand} Products List  </div>
                {product.length < 1 && <p className='h4 text-primary py-5 text-center'> No Product Found </p>}
                    {product.map((products, index) => {
                        return (
                            <div className='col-md-3 px-2' key={index}>
                                <ProductCard products={products} />
                            </div>
                        )
                    })}
                </div>
            </div> 
        </>
    )
}

export default Shoplist