import React, { Component } from "react";
import { Link } from "react-router-dom";
import Aboutus from "./Aboutus";
import Banner from "./Banner";
import BannerImage from "./BannerImage";
import "./home.css";
import Contactmap from "./Contactmap";
import Contactus from "./Contactus";
import { Element } from "react-scroll";
import Footer from "./Footer";

class Content extends Component {
  componentDidMount() {
    // Dynamically load the first Elfsight script for Instagram widget
    const scriptInstagram = document.createElement("script");
    scriptInstagram.src = "https://static.elfsight.com/platform/platform.js";
    scriptInstagram.async = true;
    document.body.appendChild(scriptInstagram);

    // Dynamically load the second Elfsight script for the additional widget
    const scriptSecondWidget = document.createElement("script");
    scriptSecondWidget.src = "https://static.elfsight.com/platform/platform.js";
    scriptSecondWidget.async = true;
    document.body.appendChild(scriptSecondWidget);

    // Clean up the scripts when component unmounts
    return () => {
      document.body.removeChild(scriptInstagram);
      document.body.removeChild(scriptSecondWidget);
    };
  }

  render() {
    return (
      <>
        <BannerImage />
        <Banner />
        <div className="container content-container">
          <div className="intro-text">
            <h1 className="title">OWL CAFE: A Taste Of Elegance </h1>
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

        {/* Elfsight Instagram Embed */}
        <div className="elfsight-app-40813ffe-92b4-4f68-a70d-fce405ce230e" data-elfsight-app-lazy></div>

        <Contactus />
        <Contactmap />

        {/* Additional Elfsight Widget Embed */}
        <div className="elfsight-app-c01c6bba-552a-49de-b092-7f80ad7c7bd6" data-elfsight-app-lazy></div>
        <Footer/>
      </>
    );
  }
}

export default Content;
