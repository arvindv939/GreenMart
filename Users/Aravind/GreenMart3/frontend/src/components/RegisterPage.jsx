import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";


const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", shopName: "", phone: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/shopowners/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Registration successful:", response.data);
      localStorage.setItem("token", response.data.token); // Store token in local storage
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleInputChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default RegisterPage;
