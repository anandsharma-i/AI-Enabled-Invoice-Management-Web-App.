import React from 'react';
import Footer from './footer/Footer';
import GridPanel from './body/GridPanel';
import Header from './header/Header'
import '../styling/style.css';

/**
 * This is App  
 *it calls Header,GridPanel,Footer component

 NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

function App() {
  return (
    <div className="App">
     <Header/>
     <GridPanel/>
     <Footer/>     
    </div>
  );
}

export default App;
