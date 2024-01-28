import React, { useState, useEffect } from "react";
import Toggle from "./Toggle";


function Header(props) {
  const { isToggled, setIsToggled } = props;

  return (
    <header>
      <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom p-5">
          <a class="header-content d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none gap-3">
            <img src="./images/OPENAI.png" height="50px" width="50px" />
            <span class="fs-4">ArgueAI</span>
          </a>
          <Toggle isToggled={isToggled} setIsToggled={setIsToggled}/>

        </header>
      </div>
    </header>
    
  );
}

export default Header;
