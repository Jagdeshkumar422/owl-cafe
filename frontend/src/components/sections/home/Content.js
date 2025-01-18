import React, { Component, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import Aboutus from "./Aboutus";
import Banner from "./Banner";
import BannerImage from "./BannerImage";
import Contactmap from "./Contactmap";
//import Categories from "./Categories";
//import Cta from "./Cta";
//import Instagram from "./Instagram";
//import Products from "./Products";
//import Testimonials from "./Testimonials";
import { Link as ScrollLink, Element } from "react-scroll";

class Content extends Component {
  render() {
    return (
      <>
        <BannerImage />

        <Banner />
        <center>
          <div className="container">
            <h1 className="title"> OWL A Taste of Elegance</h1>

            <p className="subtitle">
              Our menu is a canvas of flavors, painted with the freshest
              ingredients and a dash of innovation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Link to="menu-v1" className="btn-custom primary" style={{ margin: '1%' }}>
  View Menu
</Link>

            <ScrollLink
          to="aboutus"
          smooth={true}
          duration={500}
          className="btn-custom primary"
        >
\/        </ScrollLink>
        </div>
            <br />

            <br />
          </div>
        </center>
        <Element name="aboutus">
          <Aboutus />
        </Element>
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
