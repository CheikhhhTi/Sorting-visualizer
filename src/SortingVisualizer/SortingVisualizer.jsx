import React, { Component } from "react";

import "./SortingVisualizer.css";

const Numofbars = 190;
export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [], 
      comparing: [],
      swapped: [],
      stopAnimation: false,
      isAnimating: false,
      sorted: false,
      numBars: 190,
    };
  }

handleNumBarsChange = (event) => {
    const value = Math.min(10000, Math.max("0", Number(event.target.value)));
    this.setState({ numBars: value }, () => {
      this.resetArray();
    });
  };

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numBars; i++) {
      array.push(randomInt(5, 850));
    }
    this.setState({ array, comparing: [], swapped: [], sorted: false });
  }

  stopAnimations = () => {
  this.setState({ stopAnimation: true, comparing: [], swapped: [], sorted: false, isAnimating: false });
  };

  bubbleSort() {

    const animations = [];
    const array  = [...this.state.array];

    // Generate animations
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        // Push the indices being compared
        animations.push({ type: "compare", indices: [j, j + 1] });

        if (array[j] > array[j + 1]) {
          // Push the indices being swapped
          animations.push({ type: "swap", indices: [j, j + 1] });

          // Perform the swap
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }

    // Execute animations
    this.setState({ isAnimating: true, stopAnimation: false, sorted: false }, () => {
      this.animateBubbleSort(animations);
  });
}
animateBubbleSort(animations) {
  let array = [...this.state.array];
  let i = 0;

  const animate = () => {
    if (this.state.stopAnimation || i >= animations.length) {
      this.setState({ comparing: [], swapped: [], stopAnimation: false, isAnimating: false, sorted: true});
      return;
    }

    const animation = animations[i];
    if (animation.type === "compare") {
      this.setState({ comparing: animation.indices });
    } else if (animation.type === "swap") {
      const [a, b] = animation.indices;
      const temp = array[a];
      array[a] = array[b];
      array[b] = temp;
      this.setState({ array: [...array], swapped: animation.indices });
    }

    i++;
    setTimeout(animate, 0.01);
  };

  animate();
}
  
  insertionSort() {
  const animations = [];
  const array = [...this.state.array];

  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      animations.push({ type: "compare", indices: [j - 1, j] });
      animations.push({ type: "swap", indices: [j - 1, j] });

      // Swap in the array for animation generation
      const temp = array[j];
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
    }
    if (j > 0) {
      animations.push({ type: "compare", indices: [j - 1, j] });
    }
  }
    this.setState({ isAnimating: true, stopAnimation: false, sorted: false }, () => {
    this.animateInsertionSort(animations);
  });
}

// Heap Sort
getHeapSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: "swap", indices: [0, i] });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    animations.push({ type: "compare", indices: [largest, left] });
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n) {
      animations.push({ type: "compare", indices: [largest, right] });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      animations.push({ type: "swap", indices: [i, largest] });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }

  return animations;
}

heapSort() {
  const animations = this.getHeapSortAnimations(this.state.array);
  this.setState({ isAnimating: true, stopAnimation: false, sorted: false }, () => {
    this.animateHeapSort(animations);
  });
}

animateHeapSort(animations) {
  let array = [...this.state.array];
  let i = 0;

  const animate = () => {
    if (this.state.stopAnimation) {
      this.setState({ comparing: [], swapped: [], stopAnimation: false, isAnimating: false, sorted: false });
      return;
    }
    if (i >= animations.length) {
      this.setState({ comparing: [], swapped: [], stopAnimation: false, isAnimating: false, sorted: true });
      return;
    }

    const animation = animations[i];
    if (animation.type === "compare") {
      this.setState({ comparing: animation.indices, swapped: [] });
    } else if (animation.type === "swap") {
      const [a, b] = animation.indices;
      const newArray = [...array];
      const temp = newArray[a];
      newArray[a] = newArray[b];
      newArray[b] = temp;
      array = newArray;
      this.setState({ array: newArray, swapped: animation.indices });
    }

    i++;
    setTimeout(animate, 20);
  };

  animate();
}

animateInsertionSort(animations) {
  let array = [...this.state.array];
  let i = 0;

  const animate = () => {
    if (this.state.stopAnimation || i >= animations.length) {
        this.setState({ comparing: [], swapped: [], stopAnimation: false, isAnimating: false, sorted: true });
      return;
    }

    const animation = animations[i];
    if (animation.type === "compare") {
      this.setState({ comparing: animation.indices, swapped: [] });
    } else if (animation.type === "swap") {
      const [a, b] = animation.indices;
      const newArray = [...array];
      const temp = newArray[a];
      newArray[a] = newArray[b];
      newArray[b] = temp;
      array = newArray;
      this.setState({ array: newArray, swapped: animation.indices });
    }

    i++;
    setTimeout(animate, 0.01);
  };

  animate();
}

quickSort() {
  const animations = this.getQuickSortAnimations(this.state.array);
  this.setState({ isAnimating: true, stopAnimation: false, sorted: false }, () => {
    this.animateQuickSort(animations);
  });
}

getQuickSortAnimations(array) {
  const animations = [];
  const arr = [...array];

  function quickSort(start, end) {
    if (start >= end) return;
    let pivotIdx = partition(start, end);
    quickSort(start, pivotIdx - 1);
    quickSort(pivotIdx + 1, end);
  }

  function partition(start, end) {
    let pivot = arr[end];
    let i = start;
    for (let j = start; j < end; j++) {
      animations.push({ type: "compare", indices: [j, end] });
      if (arr[j] < pivot) {
        animations.push({ type: "swap", indices: [i, j] });
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    animations.push({ type: "swap", indices: [i, end] });
    [arr[i], arr[end]] = [arr[end], arr[i]];
    return i;
  }

  quickSort(0, arr.length - 1);
  return animations;
}

animateQuickSort(animations) {
  let array = [...this.state.array];
  let i = 0;

  const animate = () => {
    if (this.state.stopAnimation || i >= animations.length) {
      this.setState({ comparing: [], swapped: [], stopAnimation: false, isAnimating: false, sorted: true });
      return;
    }

    const animation = animations[i];
    if (animation.type === "compare") {
      this.setState({ comparing: animation.indices, swapped: [] });
    } else if (animation.type === "swap") {
      const [a, b] = animation.indices;
      const newArray = [...array];
      const temp = newArray[a];
      newArray[a] = newArray[b];
      newArray[b] = temp;
      array = newArray;
      this.setState({ array: newArray, swapped: animation.indices });
    }

    i++;
    setTimeout(animate, 0.01);
  };

  animate();
}



  render() {
    const { array, comparing, swapped, isAnimating, numBars } = this.state;
    return (
      <div>
        <div className="controls">
          <div className="bars-input-container">
            <label htmlFor="numBars">Number of bars:</label>
            <input
              type="number"
              id="numBars"
              min="0"
              max="10000"
              value={numBars}
              onChange={this.handleNumBarsChange}
              disabled={isAnimating}
            />
          </div>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
          <div
            className={`array-bar ${
              comparing.includes(idx) ? "comparing" : ""
            } ${swapped.includes(idx) ? "swapped" : ""} ${this.state.sorted ? "sorted" : ""}`}
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
          ))}

        </div>
        <div className="buttonss">
          <button className="NewArr" onClick={() => this.resetArray()} disabled={isAnimating}>Generate New Array</button>
          <button onClick={() => this.bubbleSort()} disabled={isAnimating}>Bubble Sort</button>
          <button onClick={() => this.insertionSort()} disabled={isAnimating}>Insertion Sort</button>
          <button onClick={() => this.quickSort()} disabled={isAnimating}>Quick Sort</button>
          <button onClick={() => this.heapSort()} disabled={isAnimating}>Heap Sort</button>
          <button className="stop" onClick={this.stopAnimations} disabled={!isAnimating}>Stop Animation</button>        
        </div>
      </div>

    );
  }
}

// Utility function to generate random integers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}