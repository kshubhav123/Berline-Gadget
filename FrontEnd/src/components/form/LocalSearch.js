import React from 'react'

const LocalSearch = ({ keyword, setkeyword }) => {
    const handleSeachChange = (e) => {
        e.preventDefault();
        setkeyword(e.target.value.toLowerCase());
    }

    return (
        <React.Fragment>
            <input type="search" placeholder='Search Category' value={keyword} onChange={handleSeachChange} className="p-2 mb-3 border border-1 rounded-2 fs-6 w-100" />
        </React.Fragment>
    )
}

export default LocalSearch