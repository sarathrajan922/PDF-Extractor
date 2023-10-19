import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <div className="App">
      
       <h3 className='text-gray-600'>PDF Extractor</h3>
    
    </div>
    <Outlet/>
    </>
  );
}

export default App;
