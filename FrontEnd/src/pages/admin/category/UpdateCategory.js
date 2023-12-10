import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/form/CategoryForm";

const UpdateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    console.log(slug)

    const navigate = useNavigate();


    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () => {
        getCategory(slug).then((c) => setName(c.data.name));
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                navigate("/admin/category");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };



    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6">
                <div className='fs-2 fw-bold pb-4 text-center'> Update Category </div>
                    <CategoryForm HandleSubmit={HandleSubmit} name={name} setName={setName} slug={slug} />
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
