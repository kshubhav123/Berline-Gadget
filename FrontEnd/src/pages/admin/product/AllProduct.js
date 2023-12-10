import React, { useEffect, useState } from 'react'
import AdminProductCard from '../../../components/card/AdminProductCard';
import AdminNav from '../../../components/nav/AdminNav';
import { getlistProducts, removeProducts } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProduct = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState();

    useEffect(() => {
        return loadProductList();
    }, [])

    const loadProductList = () => {
        getlistProducts(100).then((res) => {
            setProducts(res.data)
            setLoading(false);
        }).catch((err) => {
            console.log("Product Get Error", err);
        })
    }

    const handleRemove = (slug) => {
        console.log(slug, user.token);
        let confirmation = window.confirm("Delete or Not");
        if (confirmation)
            // console.log("Data Id is",`${slug}`);
            removeProducts(slug, user.token).then((res) => {
                loadProductList();
                toast.error(`${res.data} is deleted`)
            }).catch((err) => {
                //  if (err.response.status === 400) toast.error(err.response.data)
                toast.error(err.response.data.error);
                toast.error(err.response.data.error);

            })


    }

    return (
        <React.Fragment>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"><AdminNav /></div>
                    <div className='col-md-1'></div>
                    <div className="col-md-8 p-5">
                        <div className='fs-2 fw-bold pb-4 text-center'> Product List </div>

                        <table class="table">
                            <thead className='table-secondary'>
                                <tr>
                                    <th scope="col" className='py-3 fs-6'>Product</th>
                                    <th scope="col" className='py-3 fs-6'>Name</th>
                                    <th scope="col" className='py-3 fs-6'>Price</th>
                                    <th scope="col" className='py-3 fs-6'>Stock</th>
                                    <th scope="col" className='py-3 fs-6'>Availibility</th>
                                    <th scope="col" className='py-3 fs-6'>Color</th>
                                    <th scope="col" className='py-3 fs-6'>Action</th>

                                </tr>
                            </thead>
                            {loading ? <h4 className='text-danger'>Loading...</h4> : (
                                <tbody>
                                    {product.map((products) => {
                                        return (
                                            <tr>
                                                <AdminProductCard products={products} handleRemove={handleRemove} />
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AllProduct