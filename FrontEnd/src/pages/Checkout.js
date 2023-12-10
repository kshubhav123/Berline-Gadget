import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { emptyUserCart, getuserCart, saveUserAddress, applyCoupon } from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupan, setCoupan] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

const navigate=useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getuserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);


  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupan("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };


  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupan(e.target.value)
          setDiscountError(""); 
        }}
        value={coupan}
        type="text"
        className="form-control"

      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );


  const applyDiscountCoupon = (e) => {
    console.log("send coupon to backend", coupan);
    applyCoupon(user.token, coupan).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type:"COUPAN_APPLIED",
          payload:true
        })
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch({
          type:"COUPAN_APPLIED",
          payload:false
        })
      }
    });
  }



  return (
    <div className="container">
    <div className="row py-4">
      <div className="col-md-6">
        <h4 className="mb-0 fw-bold">Delivery Address</h4>
        <br />
        <br />
       <div className="fs-5 mb-1">Address</div> 
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <br/>
        <h4>Got Coupon?</h4>
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
        {/* coupon input and apply button */}
      </div>

      <div className="col-md-6 p-5">
        <h4 className="fw-bold">Order Summary</h4>
        <div className="fs-5">Products<span className="fw-bold mx-2">{products.length} </span> </div>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <button
            className="btn btn-outline-success w-auto ms-2"
            disabled={!addressSaved || !products.length}
            onClick={()=>navigate("/payment")}
          >
            Place Order
          </button>

          <div className="col-md-6">
            <button disabled={!products.length} onClick={emptyCart} className="btn btn-outline-danger">
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Checkout;
