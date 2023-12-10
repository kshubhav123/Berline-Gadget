import axios from "axios";

export const createBrand = async (brand, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/brand`, brand, {
        headers: {
            authToken
        }
    })
}

export const brandsList = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/brands`);
}

export const getbrand = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/brand/${slug}`)
}

export const removebrand = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/brand/${slug}`, {
        headers: {
            authToken,
        }
    })
}

