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
            <img src= {isToggled? "./images/LOGO.png":"./images/LOGO_HAPPY.png"}height="50px" width="50px" alt="OpenAI logo" />
            <span className="fs-4">ArgueAI</span>
          </a>
          <Toggle isToggled={isToggled} setIsToggled={setIsToggled}/>

        </header>
      </div>
    </header>
    
  );
}

export default Header;
