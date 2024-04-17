import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Don't forget to import axios

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          role: "Patient"
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <navigate to={"/"} />;
  }

  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login to Continue</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam praesentium, eos officiis reprehenderit, molestiae.</p>
      <form onSubmit={handleLogin}>
        <input 
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div 
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }} 
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
