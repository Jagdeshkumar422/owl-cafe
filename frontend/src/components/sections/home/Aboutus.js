import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Aboutus extends Component {
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-lg-30 ct-single-img-wrapper">
                            <img src={process.env.PUBLIC_URL + "/assets/Food Photo.jpg"} alt="OWL Cafe & Restaurant Interior" />
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title-wrap mr-lg-30">
                                <h5 className="custom-primary">A Blend of Tradition and Modernity</h5>
                                <h2 className="title">Discover OWL Cafe & Restaurant</h2>
                                {/*<p className="subtitle">
                                    Nestled in the heart of Dubai's bustling Al Garhoud area, OWL Cafe & Restaurant offers a unique dining experience, combining the rich flavors of Arabic and Continental cuisines. With our special focus on luxury shisha services, featuring multiple flavors, and vibrant entertainment options including karaoke and live singing shows, OWL is your go-to destination for an unforgettable night out.
                                </p>
                                <p className="subtitle">
                                    Since our inception, we have been committed to providing exceptional food and a welcoming atmosphere, making us a favorite among locals and tourists alike. Whether you're looking for a relaxing lunch, a gourmet dinner, or an evening of entertainment and shisha, OWL Cafe & Restaurant promises an experience that's both delightful and memorable.
                                </p>
                                {/*<div className="signature">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/signature.png"} alt="Owner Signature" />
                                </div>*/}
                                <p className="subtitle">
                                    Nestled in the heart of Dubai's peaceful Al Garhoud area, OWL Cafe & Restaurant offers a unique dining experience, combining the rich flavors of Arabic and Continental cuisines. With our special focus on luxury shisha services, featuring multiple flavors, and vibrant entertainment options including karaoke and live singing shows, OWL is your go-to destination for an unforgettable night out.
                                </p>
                                <p className="subtitle">
                                    Since opening our doors, we’ve been dedicated to creating a warm and inviting atmosphere where families can gather for a meal, celebrate special occasions, or simply enjoy a day out. Whether you're seeking a leisurely lunch, a delightful dinner, or an evening filled with entertainment and shisha, OWL Cafe & Restaurant is your family's home away from home.
                                </p>
                                <Link to="/menu-v1" className="btn-custom primary">Explore Our Menu</Link>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aboutus;
