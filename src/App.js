import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import Home from "./SortingVisualizer/Home";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer" element={<SortingVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;