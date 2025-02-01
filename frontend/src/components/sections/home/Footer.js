import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div 
      style={{
        textAlign: "center", 
        backgroundColor: "#333", 
        margin: "0px", 
        padding: "10px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
      }}
    >
      <p style={{textAlign: "center", paddingTop: "10px", color: "#fff"}}>
        Developed and Powered by{" "}
        <a 
          href="https://www.ce.digital" 
          className="footer-text" 
        >
          Competitive Edge Digital
        </a>
      </p>
    </div>
  );
};

export default Footer;
