
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectPage from "./component/ProtectPage.jsx";
import Redirect from "./pages/Redirect";


function App() {

  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/redir" element={<Redirect />} />
              <Route path="/home" element={
                  <ProtectPage>
                      <Home />
                  </ProtectPage>

              } />
              <Route path="/register" element={<Register />} />
          </Routes>
      </Router>

    </>
  )
}

export default App;
