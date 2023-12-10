import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { createBrand, removebrand, brandsList } from "../../../functions/brand"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import BrandForm from '../../../components/form/BrandForm';
import LocalSearch from '../../../components/form/LocalSearch';


const CreateBrand = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = useState([]);
    const [keyword, setkeyword] = useState("");

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        brandsList().then((res) => setBrand(res.data));
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createBrand({ name }, user.token).then((res) => {
            setLoading(true);
            setName("")
            toast.success(`${res.data.name}`, "created Successfully");
            loadCategories();
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data)
        })
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removebrand(slug, user.token).then((res) => {
                setLoading(false);
                toast.error(`${slug} is deleted`)
                loadCategories();
            }).catch((err) => {
                if (err.response.status === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            })
        }

    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-2"><AdminNav /></div>
                    <div className="col-md-1"></div>

                    <div className="col-md-6 justify-content-center">
                        <div className='fs-2 fw-bold pb-4 text-center'> Create Brand </div>

                        <BrandForm HandleSubmit={HandleSubmit} name={name} setName={setName} />

                        <div className='my-3'>
                            <LocalSearch keyword={keyword} setkeyword={setkeyword} />
                        </div>

                        <table class="table">
                            <thead className='table-secondary'>
                                <tr className='d-flex border w-100 justify-content-between'>
                                    <th className='py-3 fs-6 px-4'>Brand</th>
                                    <th className='py-3 fs-6 px-4'>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {brand.filter(searched(keyword)).map((b) => {
                                    return (
                                        <tr key={b._id} className='d-flex border w-100 justify-content-between'>
                                            <td className='border-0'>
                                                <div className='fs-6 fw-bold'>
                                                    {b.name}
                                                </div>
                                            </td>
                                            <td className='border-0'>
                                                <div className="">
                                                    <Link to={`/admin/brand/${b.slug}`}  className='btn text-success'> <i class="fa fa-edit"></i></Link>
                                                    <button className='btn text-danger' onClick={() => handleRemove(b.slug)}> <i class="fa fa-trash"></i> </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateBrand;