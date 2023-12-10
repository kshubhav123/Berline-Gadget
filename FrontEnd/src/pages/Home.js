import React from 'react'
import Jumbotron from '../components/card/Jumbotron';
import CategoryList from '../components/categories/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivels from '../components/home/NewArrivels';
import SubsList from '../components/subs/SubsList';
import Ourbrands from '../components/home/Ourbrands';

const Home = () => {

  return (
    <React.Fragment>

      {/* caresual */}
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 1" aria-current="true"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/July/Attachbanner/D51285990_WLA_Attach_JulyAcc_Mob_Hero_1242x450_2.jpg" height="500" className='w-100' alt="Image 1" />
            <div class="container">
              <div class="carousel-caption text-start">
                <h1>New Collection</h1>
                Some representative placeholder content for the first slide of the carousel.
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/vinambia/MSOAug/D80228526_WLD_5Gstore_BAU_DesignSIM_1242x500final.jpg" height="500" className='w-100' alt="Image 1" />
          
            <div class="container">
              <div class="carousel-caption">
                <h1>New Brands</h1>
                Some representative placeholder content for the second slide of the carousel.
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/katariy/Category_page/July2023/topbanner_A.jpg" height="500" className='w-100' alt="Image 1" />
            <div class="container">
              <div class="carousel-caption text-end">
                <h1>New Mobile</h1>
                Some representative placeholder content for the third slide of this carousel.
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-md banner_down_card my-2 px-2'>
            <div className='card border-0 rounded-4 shadow text-center'>
              <i class="fa-solid fa-truck-fast mt-5 fs-4"></i>
              <div className='text-center mt-3 h4 fw-bold'>FREE SHOPPING</div>
              <div className='text-center mb-5'>Free shipping over $100</div>
            </div>
          </div>
          <div className='col-md banner_down_card my-2 px-2'>
            <div className='card border-0 rounded-4 shadow text-center'>
              <i class="fa-solid fa-money-check-dollar mt-5 fs-4"></i>
              <div className='text-center mt-3 h4 fw-bold'>Money Back Gurantee</div>
              <div className='text-center mb-5'>Send to you within 24 hours</div>
            </div>
          </div>
          <div className='col-md banner_down_card my-2 px-2'>
            <div className='card border-0 rounded-4 shadow text-center'>
              <i class="fa-solid fa-phone mt-5 fs-4"></i>
              <div className='text-center mt-3 h4 fw-bold'>24 HOURS SUPPORT</div>
              <div className='text-center mb-5'>Call : 021 546 256658</div>
            </div>
          </div>
        </div>
      </div>


      <div className='d-flex container mt-5 mb-3 py-3'>
        <div class="vertical-line me-2"></div>
        <div class="h2 text-start">
          NEW ARRIVALS
          <div class="fs-5 text-start text-secondary mt-1">
            Lorem is the best thought of orange.
          </div>
        </div>
      </div>
      
      <NewArrivels />


      <div className='d-flex container mt-5 mb-3 py-3'>
        <div class="vertical-line me-2"></div>
        <div class="h2 text-start">
          BEST ARRIVALS
          <div class="fs-5 text-start text-secondary mt-1">
            Lorem is the best thought of orange.
          </div>
        </div>
      </div>
      <BestSellers />

      <div className='d-flex container mt-5 mb-3 py-3'>
        <div class="vertical-line me-2"></div>
        <div class="h2 text-start">
          OUR BRANDS
          <div class="fs-5 text-start text-secondary mt-1">
            Lorem is the best thought of orange.
          </div>
        </div>
      </div>
      <Ourbrands />

    

    </React.Fragment>
  )
}

export default Home