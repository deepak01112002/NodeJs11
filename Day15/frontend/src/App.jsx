import React from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} exact />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
