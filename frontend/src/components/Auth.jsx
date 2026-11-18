import { useState } from "react";
import { loginUser, registerUser } from "../services/api";

const Auth = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = isLogin
        ? await loginUser({ email, password })
        : await registerUser({ name, email, password });
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Application Tracker</h1>
        <p>{isLogin ? "Log in to your pipeline" : "Create your account"}</p>
      </div>

      <form onSubmit={handleSubmit} className="job-form auth-form">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn-primary">
          {isLogin ? "Log In" : "Register"}
        </button>
        <p className="switch-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Log in"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
