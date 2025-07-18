import React, { useState } from "react";
import "./Login.css"; // ✅ We'll style it same as sidebar

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onLogin(name.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connectly Login</h2>
        <p>Enter your name to join the chat</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
