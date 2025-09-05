import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
