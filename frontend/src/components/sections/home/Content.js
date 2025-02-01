import React, { Component } from "react";
import { Link } from "react-router-dom";

import Aboutus from "./Aboutus";
import Banner from "./Banner";
import BannerImage from "./BannerImage";
import "./home.css";
import Contactmap from "./Contactmap";
import Contactus from "./Contactus";
import { Element } from "react-scroll";

class Content extends Component {
  componentDidMount() {
    // Dynamically load the Elfsight script for Instagram widget
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }

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

        <Contactus />
        {/* Elfsight Instagram Embed */}
        <div className="elfsight-app-40813ffe-92b4-4f68-a70d-fce405ce230e" data-elfsight-app-lazy></div>

        <Contactmap />
      </>
    );
  }
}

export default Content;
