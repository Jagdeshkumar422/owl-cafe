import React, { Component } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const customMarker = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
  iconSize: [32, 32],
});

const latlng = [51.5, -0.09];

class Contactmap extends Component {
  render() {
    return (
      <div className="section-map pb-0">
        

        <div className="section section-padding">
          <div className="container">
            <div className="contact-info">
              <div className="row">
                <div className="col-xl-6">
                  <div className="ct-info-box">
                    <i className="flaticon-location" />
                    <h5>Contact Us</h5>
                    <span>OWL Cafe Dubai</span>
                    <span>04 259 4647</span>
                    <span> 055 52 559 6620 </span>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="ct-info-box">
                    <i className="flaticon-online-booking" />
                    <h5>Opening Hours</h5>

                    <span>
                      <span>Daily:</span>  9:30 AM TO 3:00 AM
                    </span>
                    <a href="https://g.co/kgs/N9n8pBX"  style={{color: "#FFF"}}>Google Map</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ct-contact-map-wrapper">
          <MapContainer
            className="markercluster-map ct-contact-map"
            center={latlng}
            zoom={16}
            scrollWheelZoom={false}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230963.2464160366!2d55.05124608671874!3d25.24363600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d033bfd6693%3A0x6d61a5fcd6440204!2sOWL%20Cafe%20%26%20Restaurant!5e0!3m2!1sen!2sae!4v1715664178430!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            

            {/*<TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                            attribution='&copy; Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                            maxZoom={16}
                        />*/}
            <Marker position={latlng} icon={customMarker}></Marker>
          </MapContainer>
        </div>
      </div>
    );
  }
}

export default Contactmap;
