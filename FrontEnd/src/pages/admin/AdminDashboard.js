import React from 'react'
import AdminNav from '../../components/nav/AdminNav'


const AdminDashboard = () => {

  return (
    <React.Fragment>
    
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"><AdminNav /></div>
          <div className="col-md">
          <h3> Admin Dashboard</h3>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default AdminDashboard