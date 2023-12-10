import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <React.Fragment>
            <nav className="nav flex-column mt-3 p-3">
                <Link to="/admin/product" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">Product</Link>
                <Link to="/admin/products" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">Products</Link>
                <Link to="/admin/category" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">Category</Link>
                <Link to="/admin/brand" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">Brand</Link>
                <Link to="/admin/coupan" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">Coupans</Link>
                <Link to="/user/password" className="nav-link my-1 p-3 fs-6 shadow-sm rounded-5 fw-bold admin_nav_link">Password</Link>
            </nav>
        </React.Fragment>
    )
}

export default AdminNav