import React, { Component } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import { APP_CONFIG } from "../../../config";

class BannerImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerUrl: "", // State to store the banner image URL
            error: null,   // State to handle any errors
        };
    }

    // Fetch banner image from backend
    componentDidMount() {
        this.fetchBannerImage();
    }

    fetchBannerImage = async () => {
        try {
            const response = await axios.get(`${APP_CONFIG.backendUrl}api/banner`); // Replace with your backend URL
            this.setState({ bannerUrl: response.data.imgUrl }); // Set the banner URL from backend response
        } catch (err) {
            console.error("Error fetching banner:", err);
            this.setState({ error: "Failed to load banner image." });
        }
    };
    render() {
        const { bannerUrl, error } = this.state;
        return (
            // <div className="banner banner-1 banner-4w light-banner">
            //     <div className="banner-item">
            //         <div
            //             className="bg-cover bg-center  dark-overlay-2"
            //             style={{
            //                 backgroundColor: "#333333",
            //                 backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/background_with_layer_2.png)",
            //                 // Other styles...
            //                 display: "flex",
            //                 flexDirection:"column",
            //                 justifyContent: "flex-start",
            //                 alignItems: "center",
            //             }}// Ensure the parent div has a defined height}}
            //         //backgroundImage:"url(" +process.env.PUBLIC_URL +"/assets/img/banner/background.png)", }}

            //         >
            //              {bannerUrl ? (
            //             <img
            //                 src={bannerUrl}
            //                 alt="Logo"
            //                 className="banner-logo" // Apply the CSS class here

            //                /* style={{
            //                     height: '32%', // 80% of the parent div's height
            //                     width: '32%' // Width will adjust based on the image's aspect ratio
            //                 }}*/
            //             />
            //              ):  error ? (
            //                 <p style={{ color: "red" }}>{error}</p> // Display error if fetching fails
            //             ) : (
            //                 <p>Loading banner...</p> // Display loader while fetching
            //             )}
            //             <p style={{lineHeight: 0.7,  letterSpacing: '4.5px',fontSize:'30px' ,color: '#C0C0C0',
            //             textShadow: '1px 1px 2px #000000' /* Soft black shadow to enhance legibility */}}> <b>OWL</b> </p>

            //             <p style={{marginBottom:"18px", lineHeight: 0.3, letterSpacing: '0.px',fontSize:'26px',color: '#C0C0C0', textShadow: '100px 100px 200px '}}>Restaurant And Cafe</p>

            //         </div>
            //     </div>
            // </div>
            <>
             {bannerUrl ? (
                        <img
                            src={bannerUrl}
                            alt="Logo"
                            className="banner-logo1" // Apply the CSS class here


                        />
                         ):  error ? (
                            <p style={{ color: "red" }}>{error}</p> // Display error if fetching fails
                        ) : (
                            <p>Loading banner...</p> // Display loader while fetching
                        )}
            </>
        );
    }
}

export default BannerImage;
