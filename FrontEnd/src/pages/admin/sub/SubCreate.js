import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { categoriesList } from "../../../functions/category"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/form/CategoryForm';
import LocalSearch from '../../../components/form/LocalSearch';
import { createSub, removeSub, subsList } from '../../../functions/sub';


const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [sub, setSubs] = useState([]);
  const [keyword, setkeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, [])


  const loadCategories = () => {
    categoriesList().then((res) => setCategories(res.data));
  }

  const loadSubs = () => {
    subsList().then((res) => setSubs(res.data));
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token).then((res) => {
      setLoading(true);
      setName("")
      toast.success(`${res.data.name}`, "created Successfully");
      loadSubs();
    }).catch((err) => {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data)
    })
  }

  const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);


  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token).then((res) => {
        setLoading(false);
        toast.error(`${slug} is deleted`)
        loadSubs();
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
          <div className='col-md-1'></div>
          <div className="col-md-6">
            <div className='fs-2 fw-bold pb-4 text-center'> Create Sub-Category </div>

            <div className='form-group'>
              <label className="fs-6 fw-bold mb-2 text-center ms-1">Select Category</label>
              <select className='p-2 mb-3 border border-1 rounded-2 fs-6 w-100' onChange={((e) => setCategory(e.target.value))}>
                <option>Please select </option>
                {categories.length > 0 && categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  )
                })}
              </select>
            </div>

            <CategoryForm HandleSubmit={HandleSubmit} name={name} setName={setName} />

            <LocalSearch keyword={keyword} setkeyword={setkeyword} />

            {sub.filter(searched(keyword)).map((s) => {
              return (
                <div key={s._id}>
                  <div className="row">
                    <div className="col-6">
                      <span> {s.name}</span>
                    </div>
                    <div className="col-6">
                      <Link to={`/admin/sub/${s.slug}`} className='text-success mx-4'>Edit</Link>
                      <button className='text-danger' onClick={() => handleRemove(s.slug)}>Delete</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SubCreate;