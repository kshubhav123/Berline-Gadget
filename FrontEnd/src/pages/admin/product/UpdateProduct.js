import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav';
import { getProduct, updateProduct } from '../../../functions/product';
import UpdateProductForm from '../../../components/form/UpdateProductForm';
import { categoriesList, getSubs } from '../../../functions/category';
import FileUpload from '../../../components/form/FileUpload';
import { toast } from 'react-toastify';
import {brandsList} from "../../../functions/brand"

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    sub: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Silver", "White", "Blue"],
    color: "",
    brand: ""
};

const UpdateProduct = () => {
    const { slug } = useParams();
    const [values, setValue] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubsOption] = useState([]);
    const [brands,setBrands]=useState([])
    const [arrayOfSub,setArrayOfSubs]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState("");
    const { user } = useSelector((state) => ({ ...state }))


    useEffect(() => {
        loadProduct();
        loadCategories();
        loadBrands();
    }, []);


    const loadBrands = () => {
        brandsList().then((res) => setBrands(res.data))
    }


    const loadProduct = () => {
        getProduct(slug).then((p) => {
            setValue({ ...values, ...p.data })
            getSubs(p.data.category._id).then((res) => {
                setSubsOption(res.data);
            });
            // prepare array of subs
            let arr = [];
            p.data.sub.map((s) => {
                return arr.push(s._id)
            });
            console.log("Arr", arr);
            setArrayOfSubs((prev) => arr);
        }).catch((e) => {
            console.log("Could not Load product List", e);
        })
    }



    
        const loadCategories = () => {
            categoriesList().then((res) =>{
            console.log("Get categories", res.data)
                setCategories(res.data)
            });
        }


    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            values.sub=arrayOfSub;
            values.category=selectedCategory?selectedCategory:values.category
            updateProduct(slug,values,user.token).then((res)=>{
                console.log(res);
                toast.success(`${res.data.title} is Updated`);
            })
        }catch(e){
            console.log("Update Failed ---->",e)
        }
    }


    const handleChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    }


    const handleClickChange = (e) => {
        e.preventDefault();
        console.log("Click Category Id", e.target.value)
        setValue({ ...values, subs:[] });
        setSelectedCategory(e.target.value);

        getSubs(e.target.value).then((res) => {
            console.log("Sub Option", res);
            setSubsOption(res.data);
        });
        console.log("Exiting category", values.category);


if(values.category._id===e.target.value){
    loadProduct();
}
setArrayOfSubs([]);
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"><AdminNav /></div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6 p-5">
                    <div className='fs-2 fw-bold pb-4 text-center'> Update Product </div>
                        <FileUpload values={values} setValue={setValue} />
                        <UpdateProductForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValue={setValue}
                            values={values}
                            handleClickChange={handleClickChange}
                            categories={categories}
                            arrayOfSub={arrayOfSub}
                            setArrayOfSubs={setArrayOfSubs}
                            subOptions={subOptions}
                            selectedCategory={selectedCategory}
                            brands={brands}
                        />

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateProduct