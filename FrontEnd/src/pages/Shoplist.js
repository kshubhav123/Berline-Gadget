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
                <div className='h3 fw-bold text-center'> { brand.toLocaleUpperCase()} Products List  </div>
                
                {product.length < 1 && <p className='h4 text-primary my-5 text-center'> No Product Found </p>}
                    {product.map((products, index) => {
                        return (
                            <div className='col-lg-3 col-md-6 col-sm-12' key={index}>
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