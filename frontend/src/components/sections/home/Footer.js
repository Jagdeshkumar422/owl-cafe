import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div style={{textAlign: "center", backgroundColor: "#333", margin:"0px", padding:"5px",display: "flex",justifyContent:"center",alignItems:"center"}}>
        <p style={{textAlign:"center", paddingTop: "10px"}}>Developed and Powered by <Link>Competitive Edge Digital</Link> </p>
    </div>
  )
}

export default Footer