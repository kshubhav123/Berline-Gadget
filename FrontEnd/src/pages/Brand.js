import React, { useEffect, useState } from 'react';
import { brandsList } from '../functions/brand';
import { Link } from 'react-router-dom';

const Brand = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    brandsList()
      .then((res) => {
        console.log(res.data);
        setBrands(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className='container'>
        <div className='row mt-5'>
          {brands.map((brand, index) => {
            return (
              <div className='col-lg-3 col-md-4 col-sm-12 my-2'>
                <Link to={`/shoplist/${brand.slug}`} className='col-md-3 my-1 banner_down_card' key={index}>
                  <div className='card border-0 bg-transparent'>
                    <div className='p-5 h3 shadow text-dark'>{brand.name}</div> {/* Use the brand's name property */}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Brand;
