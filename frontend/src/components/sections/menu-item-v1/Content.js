import React, { Component, Fragment } from 'react';
import { Tab, Nav } from "react-bootstrap";
import { APP_CONFIG } from '../../../config';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,  // Holds the fetched product data
      loading: true,  // Track loading state
      error: null,    // Track errors
    };
  }

  // Fetch product data when the component mounts
  componentDidMount() {
    const { productId } = this.props; // Get the productId from props
    this.fetchProductData(productId);
  }

  // Function to fetch product data from the API
  fetchProductData = async (productId) => {
    try {
      const response = await fetch(`${APP_CONFIG.backendUrl}api/menu/${productId}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      this.setState({
        product: data,
        loading: false,  // Set loading to false once data is fetched
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  render() {
    const { product, loading, error } = this.state;

    // Display loading state
    if (loading) {
      return <div>Loading...</div>;
    }

    // Display error if there is an issue fetching data
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <Fragment>
        <div style={{
          backgroundColor: "#333333",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/banner/background_with_layer_2.png)`,
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
          <div className="section product-single1" style={{ padding: "2%" }}>
            <div className="container" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <div className="row" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <div className="col-sm-8" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  {/* Main Thumb */}
                  <div className="product-thumb1" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <img src={product.img} alt={product.name} />
                  </div>
                  {/* /Main Thumb */}
                </div>
              </div>
            </div>
          </div>
          <div className="section pt-0">
            <div className="container">
              {/* Additional Information Start */}
              <div className="product-additional-info">
                <Tab.Container defaultActiveKey="tab1">
                  <Tab.Content>
                    <Tab.Pane eventKey="tab1" style={{ padding: "2%", backgroundColor: "#C0C0C0" }}>
                      <h4>{product.name}</h4>
                      <div style={{ color: "#000" }} dangerouslySetInnerHTML={{ __html: product.longdescription || product.shortdesc }} />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
              {/* Additional Information End */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Content;
