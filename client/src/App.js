import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {
  // State to track the toggle status (default is false)
  const [isToggled, setIsToggled] = useState(false);

  const bodyStyle = {
    backgroundColor: isToggled ? 'black' : '#9e1800',
    padding: '5px',
    marginBottom: '4px',
    borderRadius: '3px',
    backgroundImage: "url(https://www.transparenttextures.com/patterns/back-pattern.png)"
  };

  return (
    <div>
      <div style={bodyStyle}>
        <Header isToggled={isToggled} setIsToggled={setIsToggled} />
        <Body isBadFaith={isToggled}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
