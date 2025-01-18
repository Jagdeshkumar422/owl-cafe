import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin@1" && password === "admin@123") {
      localStorage.setItem("isAuthenticated", true);
    window.location.href = "/admin/addcategory"
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-heading">Login</h2>
        <div>
          <label className="login-label">Username</label>
          <input
            type="text"
            className="login-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
