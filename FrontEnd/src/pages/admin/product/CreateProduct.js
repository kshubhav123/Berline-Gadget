import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product"
import { brandsList } from '../../../functions/brand';
import { toast } from "react-toastify";
import ProductForm from '../../../components/form/ProductForm';
import { categoriesList, getSubs } from '../../../functions/category';
import FileUpload from '../../../components/form/FileUpload';
import { useNavigate } from 'react-router-dom';

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    sub: [],
    shipping: "",
    quantity:"50",
    images: [],
    colors: ["Black", "Silver", "White", "Blue"],
    brands: [],
    brand:"",
    color: "",
};



const CreateProduct = () => {
    const navigate=useNavigate();
    const [values, setValue] = useState(initialState);
    const [subsOption, setSubsOption] = useState([]);
    const [showSubs, setShowSub] = useState(false);
    const [brands,setBrands]=useState([])
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadBrands()
        loadCategories()
    }, [])

    const loadCategories = () => {
        categoriesList().then((res) => setValue({ ...values, categories: res.data }));
    }

    const loadBrands = () => {
        brandsList().then((res) => setBrands(res.data))
    }

    const handleClickChange = (e) => {
        e.preventDefault();
        console.log("Click Category Id", e.target.value)
        setValue({ ...values,category: e.target.value });
        getSubs(e.target.value).then((res) => {
            console.log("Sub Option", res);
            setSubsOption(res.data);
        });
        setShowSub(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token).then((res) => {
            console.log(res,"Created Product");
            window.alert(`${res.data.title} created Successfully`);
            navigate("/admin/products")
        }).catch((err) => {
            console.log(err);
            // if (err.response.status === 400) toast.error(err.response.data)
            toast.error(err.response.data.error);
        })
    }


    const handleChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"><AdminNav /></div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6 p-5">
                    <div className='fs-2 fw-bold pb-4 text-center'> Create Product </div>
                    <FileUpload values={values} setValue={setValue} />
                        <ProductForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValue={setValue}
                            values={values}
                            handleClickChange={handleClickChange}
                            subsOption={subsOption}
                            showSubs={showSubs}
                            brands={brands}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreateProduct;