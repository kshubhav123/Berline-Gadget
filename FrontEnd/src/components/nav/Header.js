import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }))

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    navigate("/login")
  }

  return (
    <React.Fragment>

      <nav className="navbar navbar-expand-lg bg-light navbar-light shadow">
        <div className="container">

          <a href="/" class="d-flex align-items-center fs-5 text-primary me-3 text-decoration-none">
            <i class="fa-solid fa-binoculars"></i>
          </a>

          {user && user.role === "subscriber" && (<Link className="navbar-brand" to="/">  Berline   <span className='text-primary'>Gadgets  </span>  </Link>)}
          {user && user.role === "admin" && (<Link to="/admin/product" className='mt-1 nav-link navbar-brand'> Dash<span className='text-primary'>Board  </span></Link>)}
          {!user && (<Link className="navbar-brand" to="/">  Berline   <span className='text-primary'>Gadgets  </span>  </Link>)}

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto text-center my-2 mb-lg-0 mx-3">
              <li className="nav-item px-3">
                <Link className="nav-link active fs-6" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link fs-6" aria-current="page" to="/shop">Shop</Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link fs-6" aria-current="page" to="/brandslist">Brands</Link>
              </li>

            </ul>
            <form className="d-flex justify-content-center" role="search">
              {!user && (
                <div className="nav-item me-2">
                  <Link className="nav-link active px-3 btn-dark fs-6" aria-current="page" to="/login">Login</Link>
                </div>
              )}
            </form>

            {user && (
              <button class="btn get_strBtn text-dark me-5 mt-1 rounded-pill text-center" onClick={logout}> Logout</button>
            )}

          </div>
        </div>
      </nav>





    </React.Fragment>
  )
}

export default Header