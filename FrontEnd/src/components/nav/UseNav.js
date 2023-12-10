import React from 'react'
import { Link } from 'react-router-dom'

const UseNav = () => {
    return (
        <React.Fragment>
            <nav className="nav flex-column m-3 p-3">
                {/* <Link to="/user/history" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">User History</Link> */}
                <Link to="/user/password" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">User Password</Link>
                {/* <Link to="/user/wishlist" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">User Wishlist</Link> */}
            </nav>
        </React.Fragment>
    )
}

export default UseNav