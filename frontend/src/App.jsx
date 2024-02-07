/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import WikiPage from "./WikiPage";

function App() {
  return (
    <div className="App">
      {/* <MainPage />
      <WikiPage /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/wikipage" element={<WikiPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
