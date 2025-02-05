import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data
    console.log("Form Data:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/shopowners/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Store token in local storage
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>Dont have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default LoginPage;
