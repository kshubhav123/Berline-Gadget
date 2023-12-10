import React from 'react'

const CategoryForm = ({ HandleSubmit, name, setName, slug }) => {
    return (
        <React.Fragment>

            <form onSubmit={HandleSubmit}>
                <div className="form-group">
                <label className="fs-6 fw-bold mb-2 text-center ms-1">Category</label>
                    <input className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100" value={name} autoFocus required placeholder={slug ? slug : "Enter Category"} onChange={(e) => setName(e.target.value)} />
                    <button className='btn category-form-button p-2 px-3'>Create Category</button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default CategoryForm