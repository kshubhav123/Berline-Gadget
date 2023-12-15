import React, { useEffect, useState } from 'react'
import { getlistProducts } from '../../functions/product';
import { Link } from 'react-router-dom';

const Ourbrands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const getBrands = async () => {
            const response = await getlistProducts();
            const uniqueBrands = new Set(response.data.map((product) => product.brand.slug));
            setBrands(Array.from(uniqueBrands));
            console.log(brands);
        };
        getBrands();
    }, []);

    return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    {brands.map((brand, index) => {
                        return (
                            <div className='col-md p-3' key={index}>
                                <div className='card border-0 shadow rounded-5'>
                                    <div className='p-5 my-3 fs-2 text-center rounded-5 fw-bold '>
                                        <Link to={`/shoplist/${brand}`} className="brand_items">{brand.toUpperCase()}</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </React.Fragment>
    )
}

export default Ourbrands
