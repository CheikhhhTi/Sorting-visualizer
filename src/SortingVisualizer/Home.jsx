import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="main-title">Sorting Algorithm Visualizer</h1>
        <p className="subtitle">Watch sorting algorithms come to life with beautiful visualizations</p>

        <div className="features">
          <div className="feature-card">
            <div className="feature-title">Visual Learning</div>
            <div className="feature-desc">See how algorithms work step-by-step with color-coded animations</div>
          </div>

          <div className="feature-card">
            <div className="feature-title">Interactive</div>
            <div className="feature-desc">Generate new arrays and control animations with intuitive controls</div>
          </div>

          <div className="feature-card">
            <div className="feature-title">Multiple Algorithms</div>
            <div className="feature-desc">Compare different sorting techniques and their efficiency</div>
          </div>

          <div className="feature-card">
            <div className="feature-title">Real-time Updates</div>
            <div className="feature-desc">Watch comparisons and swaps happen in real-time</div>
          </div>
        </div>

        <Link to="/visualizer" className="cta-button">Start Visualizing</Link>

        <div className="algorithms">
          <h2>Supported Algorithms</h2>
          <div className="algo-list">
            <div className="algo-tag">Bubble Sort</div>
            <div className="algo-tag">Insertion Sort</div>
            <div className="algo-tag">Quick Sort</div>
            <div className="algo-tag">Heap Sort</div>
            <div className="algo-tag">Merge Sort</div>
          </div>
        </div>
      </div>
    </div>
  );
}