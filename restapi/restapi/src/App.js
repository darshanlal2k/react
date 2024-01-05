import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Fetchdata from './components/common/Fetchdata';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Fetchdata />} />
      </Routes>
      
    </div>
  );
}

export default App;
