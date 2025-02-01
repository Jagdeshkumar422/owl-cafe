import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Modal } from "react-bootstrap";
import Quickview from "../../layouts/Quickview";
import Masonry from "react-masonry-component";
import axios from "axios";
import { APP_CONFIG } from "../../../config";
import Footer from "../home/Footer";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalshow: false,
      lastActiveBox: -1,
      products: [], // Products fetched from backend
      productcategory: [], // Categories fetched from backend
      filteredProducts: [],
      activeItem: "All",
    };
    this.modalShow = this.modalShow.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  componentDidMount() {
    // Fetch categories and products from backend
    axios
      .get(`${APP_CONFIG.backendUrl}api/categories`) // Replace with your API endpoint for categories
      .then((res) => {
        this.setState({ productcategory: res.data });
      })
      .catch((err) => console.error("Error fetching categories:", err));

    axios
      .get(`${APP_CONFIG.backendUrl}api/menus`) // Replace with your API endpoint for products
      .then((res) => {
        const products = res.data;
        products.sort((a, b) => {
          // Sorting by first category ID if exists
          const aCategory = a.category[0]?._id || "";
          const bCategory = b.category[0]?._id || "";
          return aCategory.localeCompare(bCategory);
        });
        this.setState({ products, filteredProducts: products });
      })
      .catch((err) => console.error("Error fetching products:", err));
  }

  // Modal functions
  modalShow(index) {
    this.setState({ modalshow: true, lastActiveBox: index });
  }
  modalClose() {
    this.setState({ modalshow: false });
  }

  // Handle category filter
  handleClick = (categoryId) => {
    let filteredProducts = [];
    if (categoryId === "All") {
      // Show all products
      filteredProducts = this.state.products;
    } else {
      // Filter products based on the category ID
      filteredProducts = this.state.products.filter((product) =>
        product.category.some((cat) => cat._id === categoryId)
      );
    }
    this.setState({ filteredProducts, activeItem: categoryId });
  };

  render() {
    const settings = {
      slidesToShow: 8,
      slidesToScroll: 4,
      arrows: false,
      dots: false,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 6 } },
        { breakpoint: 991, settings: { slidesToShow: 4 } },
        { breakpoint: 575, settings: { slidesToShow: 3 } },
        { breakpoint: 400, settings: { slidesToShow: 4 } },
      ],
    };

    const imagesLoadedOptions = {
      itemSelector: ".masonry-item",
      percentPosition: true,
      resize: true,
      fitWidth: true,
    };
    const renderAll = this.state.filteredProducts.map((item, i) => (
      <div key={i} className="col product-col" style={{marginBottom: "10px"}}>
        <div className="product" style={{ backgroundColor: "#c0c0c0" }}>
          <Link className="product-thumb" to={`/menu-item-v1/${item._id}`}>
            <img src={item.img} alt={item.name} />
          </Link>
          <div className="product-body">
            <div className="product-desc">{/* Content */}</div>
            <div className="product-controls">
              <h5
                style={{
                  color: "#000",
                  height: "2.4em",
                  lineHeight: "1.2em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  wordWrap: "break-word",
                }}
              >
                {item.name}
              </h5>
              {/* Controls */}
            </div>
            <div className="price-container">
              <p className="product-price">
                AED {new Intl.NumberFormat().format(item.price.toFixed(2))}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <Fragment>
        {/* Menu Categories Start */}
        <div
          className="ct-menu-categories menu-filter"
          style={{
            backgroundColor: "#000",
            // backgroundImage:
            //   "url(" +
            //   process.env.PUBLIC_URL +
            //   "/assets/img/banner/background_with_layer_2.png)",
          }}
        >
          <Link to="/" className="btn-custom primary" style={{ margin: "2%" }}>
            Home
          </Link>
          <div className="container">
            <Slider className="menu-category-slider" {...settings}>
              <Link
                to="#"
                className={
                  this.state.activeItem === "All"
                    ? "ct-menu-category-item active"
                    : "ct-menu-category-item"
                }
                onClick={this.handleClick.bind(this, "All")}
              >
                <div className="menu-category-thumb">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/img/categories/6.jpg"
                    }
                    alt="All"
                  />
                </div>
                <div className="menu-category-desc">
                  <h6 style={{ color: "#fff" }}>All</h6>
                </div>
              </Link>
              {this.state.productcategory.map((item, i) => (
                <Link
                  key={item._id}
                  to="#"
                  className={
                    this.state.activeItem === item._id
                      ? "ct-menu-category-item active"
                      : "ct-menu-category-item"
                  }
                  onClick={this.handleClick.bind(this, item._id)}
                >
                  <div className="menu-category-thumb">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="menu-category-desc">
                    <h6 style={{ color: "#fff" }}>{item.title}</h6>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
        {/* Menu Categories End */}
        {/* Menu Wrapper Start */}
        <div
          className="section section-padding"
          style={{
            backgroundColor: "#000",
            minHeight: "100vh",
            padding: 10,
            // backgroundImage:
            //   "url(" +
            //   process.env.PUBLIC_URL +
            //   "/assets/img/banner/background_with_layer_2.png)",
          }}
        >
          <div className="container">
            <Masonry
              className="menu-container row menu-v2"
              imagesLoadedOptions={imagesLoadedOptions}
            >
              {/* Product Start */}
              {renderAll}
              {/* Product End */}
            </Masonry>
          </div>
        </div>
        <Modal
          show={this.state.modalshow}
          id="customizeModal"
          onHide={this.modalClose}
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
        >
          <Quickview productId={this.state.lastActiveBox} />
        </Modal>
        {/* Menu Wrapper End */}
        <Footer/>
      </Fragment>
    );
  }
}

export default Content;
