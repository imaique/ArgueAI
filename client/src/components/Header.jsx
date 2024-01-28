import React, { useState, useEffect } from "react";
import Toggle from "./Toggle";


function Header(props) {
  const { isToggled, setIsToggled } = props;
//  const [imageSrc, setImageSrc] = useState("./images/LOGO_HAPPY.png")

  return (
    <header>
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a className="header-content d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none gap-3">
            <img src= {isToggled? "./images/LOGO.png":"./images/LOGO_CUTE.png"}
            height="100px" width="100px" alt="OpenAI logo"
            style={{cursor: "pointer"}}
            onClick={() => setIsToggled(!isToggled)} />
            <div style={{display : "block"}}>
            <div style={{color: "#a93c2b", fontWeight: "bold", visibility: isToggled? "": "hidden"}}>Bad Faith</div>
            <div className="fs-4" style={{fontWeight: "bold"}}>ArgueAI</div>
            <div className="fs-4" style={{fontWeight: "bold", visibility: "hidden"}}>a</div>

            </div>
          </a>
        </header>
      </div>
    </header>
    
  );
}

export default Header;
