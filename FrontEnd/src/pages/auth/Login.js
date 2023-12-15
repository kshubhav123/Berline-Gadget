import React, { useEffect, useState } from 'react';
import { auth, googleAuthProvider } from "../../Firebase"
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createorUpdateUser } from '../../functions/auth';



const Login = () => {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    let intended = location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) navigate("/");
    }
  }, [user, navigate])

  const roleBasedRedirect = (res) => {
    let intended = location.state;
    if (intended) {
      console.log("hh", intended.from);
      navigate(intended.from)
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/")
      }
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult.token);
      createorUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res)
        }).catch((err) => console.log(err));
    } catch (err) {
      toast.error(err.message)
      setLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createorUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          })
          roleBasedRedirect(res)
        }).catch(err => console.log(err));
    }).catch((err) => {
      console.log(err);
      toast.error(err.message)
    })
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label ms-1 fs-5">Email</label>
          <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
          <label className="form-label ms-1 mt-3 fs-5">Password</label>
          <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />

          <div className='mt-2 mx-1'>
            {/* <div> admin portal ! <b> email :</b>admin@gmail.com <b>password : </b> 123456789  </div> */}
            <div> user portal ! <b> password :</b>user@gmail.com <b>password : </b> 123456789  </div>
          </div>

          <button type="submit" className="btn btn-dark mt-3 mb-2" disabled={!email || password.length < 6}>Login</button>



          <Link to="/register" className='ms-3 fs-6'>don't have account?</Link>
          <Link to="/forgot/password" className='ms-3'>forgot your password?</Link>
          {loading}
        </div>
      </form>
    )
  }


  return (
    <React.Fragment>
      <h2 className="h2 text-center mt-5 fw-bold">Login Page</h2>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg col-md-3"></div>
          <div className="col-lg col-md">
            {loginForm()}
            <button className='btn btn-outline-danger' onClick={handleGoogleLogin}>Login With google  </button>
          </div>
          <div className="col-lg-4 col-md-3"></div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login