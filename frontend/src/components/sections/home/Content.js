import React, { Component, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import Aboutus from "./Aboutus";
import Banner from "./Banner";
import BannerImage from "./BannerImage";
import "./home.css"
import Contactmap from "./Contactmap";
//import Categories from "./Categories";
//import Cta from "./Cta";
//import Instagram from "./Instagram";
//import Products from "./Products";
//import Testimonials from "./Testimonials";
import { Link as ScrollLink, Element } from "react-scroll";
import Contactus from "./Contactus";
<style>
  
</style>

class Content extends Component {
  render() {
    return (
      <>
        <BannerImage />

        <Banner />
        <div className="container content-container">
  <div className="intro-text">
    <h1 className="title">OWL: A Taste of Elegance</h1>
    <p className="subtitle">
      Our menu is a canvas of flavors, painted with the freshest ingredients and a dash of innovation.
    </p>
  </div>

  <div className="cta-buttons">
    <Link to="menu-v1" className="btn-custom primary">
      View Menu
    </Link>
  </div>
</div>

        <Element name="aboutus">
          <Aboutus />
        </Element>
        <Contactus/>
        <Contactmap />
        {/*<Categories />*/}
        {/*<div className="section products-section">
          <Products />
        </div>*/}
        {/*<Cta />/*}
        {/*<Testimonials />
        <Instagram />*/}
      </>
    );
  }
}

export default Content;
