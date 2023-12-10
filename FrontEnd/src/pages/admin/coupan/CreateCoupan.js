import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { createCoupon, getCoupons, removeCoupon } from "../../../functions/coupan";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupans, setCoupans] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupans();
  }, [])

  const loadAllCoupans = () => getCoupons().then((res) => setCoupans(res.data))

  const handleSubmit = (e) => {
    e.preventDefault();

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        loadAllCoupans();
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };


  const handleRemove = (coupanId) => {
    console.log("6666", coupanId);
    if (window.confirm("Delete?")) {

      removeCoupon(coupanId, user.token)
        .then((res) => {
          loadAllCoupans(); // load all coupons

          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };



  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-2"><AdminNav /></div>
        <div className="col-md-1"></div>
        <div className="col-md-6">

          <div className='fs-2 fw-bold pb-4 text-center'> Create Coupan </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="fs-6 fw-bold mb-2 text-center ms-1">Name</label>
              <input
                type="text"
                className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="fs-6 fw-bold mb-2 text-center ms-1">Discount %</label>
              <input
                type="text"
                className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="fs-6 fw-bold mb-2 text-center ms-1">Expiry</label>
              <br />
              <DatePicker
                className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <button className="btn category-form-button p-2 px-3">Create Coupan</button>
          </form>


          <table class="table mt-5">
            <thead className='table-secondary'>
              <tr className='border'>
                <th className='py-3 fs-6 px-4'>Category</th>
                <th className='py-3 fs-6 px-4'>Expiry</th>
                <th className='py-3 fs-6 px-4'>Discount</th>
                <th className='py-3 fs-6 px-4'>Action</th>
              </tr>
            </thead>

            <tbody>
              {coupans.map((c) => {
                return (
                  <tr key={c._id} className=''>
                    <td className='fs-6 px-4'>
                      <span className='fs-6 fw-bold'>
                        {c.name}
                      </span>
                    </td>
                    <td className='fs-6 px-4'>
                      <span className='fs-6 fw-bold'>
                        {new Date(c.expiry).toLocaleDateString()}
                      </span>
                    </td>
                    <td className='fs-6 px-4'>
                      <div className='fs-6 fw-bold'>
                        {c.discount}
                      </div>
                    </td>
                    <td className='px-4'>
                      <div className='fs-6 fw-bold'>
                        <DeleteOutlined
                          onClick={() => handleRemove(c._id)}
                          className="text-danger pointer"
                        />                                                </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
