import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import Home from "./SortingVisualizer/Home";

import './App.css';

function App() {
  // Use basename only in production (GitHub Pages)
  const basename = process.env.NODE_ENV === 'production' ? '/sorting-visualizer' : '';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer" element={<SortingVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;