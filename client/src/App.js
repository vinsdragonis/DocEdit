import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./containers/Home/Home";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Settings from "./containers/SettingsPage/SettingsPage";
import IndividualDocPage from "./containers/IndividualDocPage/IndividualDocPage";

import { Context } from "./context/Context";

import "./styles.css";

export default function App() {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={user ? <Dashboard /> : <Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/features" element={<h1>Features</h1>} />
          {/* <Route path="/write" element={user ? <WriteDoc /> : <Home />} /> */}
          <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
          <Route
            path="/register"
            element={!user ? <Register /> : <Dashboard />}
          />
          <Route path="/docs/:id" exact element={<IndividualDocPage />} />
          <Route path="/settings" element={user ? <Settings /> : <Home />} />
          <Route path="/*" element={user ? <Dashboard /> : <Home />} />
        </Routes>
      </Router>
    </div>
  );
}
