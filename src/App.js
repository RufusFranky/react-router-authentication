import * as React from "react";
import { Link, Routes, Route } from "react-router-dom";
import useAuth, { AuthProvider } from "./Hooks-Component/UseAuth"
import { useNavigate } from "react-router-dom";
import RequireAuth from "./Hooks-Component/RequireAuth";
import Home from "./Page-Component/HomePage";
import About from "./Page-Component/AboutPage";
import Dashboard from "./Page-Component/DashboardPage";
import Settings from "./Page-Component/SettingsPage";
import Login from "./Page-Component/LoginPage";
import "./App.css";

function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/About">ABOUT</Link>
        </li>
        <li>
          <Link to="/Dashboard">DASHBOARD</Link>
        </li>
        <li>
          <Link to="/Settings">SETTINGS</Link>
        </li>
      </ul>
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default function App() {
  return (
    <div>
      <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={
          <RequireAuth>
          <Dashboard />
        </RequireAuth>
        }/>
        <Route path="/Settings" element={
          <RequireAuth>
          <Settings />
        </RequireAuth>
        }/>
        <Route path="/Login" element={<Login />} />
      </Routes>
        </AuthProvider>
    </div>
  
  );
}