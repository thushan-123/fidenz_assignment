import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
          </Routes>
      </Router>
    </>
  )
}

export default App;
