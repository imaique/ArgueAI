import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';


function App() {
  const bodyStyle = {
    backgroundColor: "#9e1800",
  };
  return (
    <div>
    <body className="p-5 mb-4 rounded-3" style={bodyStyle}>
    <Header />
      <Body />
      <Footer />

    </body> 
     
    </div>
  );
}

export default App;
