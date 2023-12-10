import React from 'react'

const Footer = () => {
  return (
    <div class="container">
      <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div class="col mb-3">
          <a href="/" class="d-flex align-items-center mb-3 fs-1 text-dark link-body-emphasis text-decoration-none">
          <i class="fa-solid fa-binoculars"></i>
          </a>
          <p class="text-body-secondary text-align-justify fs-6"> Promotional merchandise are products branded with a logo or slogan and distributed at little or no cost to promote a brand. </p>
        </div>

        <div class="col mb-3">

        </div>

        <div class="col mb-3">
          <h5>Get to Know Us</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Career</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Press Release</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Drackken Science</a></li>
          </ul>
        </div>

        <div class="col mb-3">
          <h5>Connect with Us</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Facebook</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Twitter</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Youtube</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Instagram</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Whats app</a></li>
          </ul>
        </div>

        <div class="col mb-3">
          <h5>Let Us Help You</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Your Account</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">  Returns Center</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Help</a></li>
          </ul>
        </div>
      </footer>
    </div>)
}

export default Footer