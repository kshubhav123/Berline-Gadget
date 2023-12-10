import React from 'react'
import { Select } from "antd"

const ProductForm = ({
    handleSubmit,
    handleChange,
    setValue,
    values,
    handleClickChange,
    subsOption,
    showSubs,
    brands,
}) => {

    const { title, description, price, categories, sub, quantity, colors } = values;
    console.log(brands);

    return (
        <React.Fragment>

            <div className='form-group'>
                <label className="fs-6 fw-bold mb-2 text-center">Title </label>
                <div>  <input type="text" name="title" className='p-2 mb-3 border border-1 rounded-2 fs-6 w-100' value={title} onChange={handleChange} />
                </div>

                <label className="fs-6 fw-bold mb-2 text-center">Description </label>
                {/* <input type="text" name="description" className='p-2 mb-3 border border-1 rounded-2 fs-6 w-100' value={description} onChange={handleChange} /> */}
                <textarea name="description" rows="6" className='p-2 mb-3 border border-1 rounded-2 fs-6 w-100' value={description} onChange={handleChange} >

                </textarea>

                <label className="fs-6 fw-bold mb-2 text-center">Price </label>
                <input type="number" name="price" className='p-2 mb-3 border border-1 rounded-2 fs-6 w-100' value={price} onChange={handleChange} />

                <div className="form-group">
                    <label className="fs-6 fw-bold mb-2 text-center">Shipping</label>
                    <select name="shipping" className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100" onChange={handleChange}>
                        <option>Please Select Color</option>
                        <option value="Yes">Yes </option>
                        <option value="No">No </option>
                    </select>
                </div>

                <label className="fs-6 fw-bold mb-2 text-center">Quantity </label>
                <input type="number" name="quantity" className='p-2 mb-3 border border-1 rounded-2 fs-6 w-100' value={quantity} onChange={handleChange} />

                <div className="form-group">
                    <label className="fs-6 fw-bold mb-2 text-center">Brand</label>
                    <select name="brand" className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100" onChange={handleChange}>
                        <option>Please Select Brand</option>
                        {brands.length > 0 && brands.map((b) => {
                            return <option key={b._id} value={b._id}>{b.name} </option>
                        })}
                    </select>
                </div>



                <div className="form-group">
                    <label className="fs-6 fw-bold mb-2 text-center">Color</label>
                    <select name="color" className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100" onChange={handleChange}>
                        <option>Please Select Color</option>
                        {colors.map((c) => {
                            return <option key={c} value={c}> {c} </option>
                        })}
                    </select>
                </div>


                <div className="form-group">
                    <label className="fs-6 fw-bold mb-2 text-center">Category</label>
                    <select name="category" className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100" onChange={handleClickChange}>
                        <option>Please Select Category</option>
                        {categories.length > 0 && categories.map((c) => {
                            return <option key={c._id} value={c._id}>{c.name} </option>
                        })}
                    </select>
                </div>
                {
                    showSubs && (
                        <div className="mb-5">
                            <div>   <label className="fs-6 fw-bold mb-2 text-center">Sub Category</label></div>
                            <Select mode="multiple" className="p-2 border border-1 rounded-2 fs-6 w-100" placeholder="Please Select SubCategory" value={sub} onChange={(val) => setValue({ ...values, sub: val })}>
                                {
                                    subsOption.length > 0 && subsOption.map((s) => {
                                        return <option key={s._id} value={s._id}>{s.name}</option>
                                    })
                                }
                            </Select>
                        </div>
                    )
                }
                <button className='btn product-form-button p-2 px-3' onClick={handleSubmit}>Create Product</button>
            </div>
        </React.Fragment>
    )
}

export default ProductForm