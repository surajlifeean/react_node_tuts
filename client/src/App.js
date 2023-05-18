import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import "./App.css";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center"/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addContact" element={<AddEdit/>} />
          <Route path="/update/:id" element={<AddEdit/>} />
          <Route path="/view/:id" element={<View/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
