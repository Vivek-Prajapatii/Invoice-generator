import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1>Invoice</h1>
        <Home />
      </div>
    </div>
  );
}

export default App;
