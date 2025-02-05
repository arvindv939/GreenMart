import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css"; // Add CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  // Define fetchUserInfo outside of useEffect
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If there is no token, redirect to the login page
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/shopowners/me",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sending the token in Authorization header
          },
        }
      );
      console.log("User info fetched:", response.data);
      // You can store the user data in state if needed
    } catch (err) {
      console.error("Error fetching user info:", err);
      // Handle the error (e.g., redirect to login)
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); // Runs on component mount

  // Function to handle box clicks
  const handleBoxClick = (path) => {
    navigate(path); // Navigate to the clicked page
  };

  return (
    <div>
      <h1>Welcome to the Green Mart</h1>

      {/* Add the boxes here */}
      <div className="dashboard-container">
        <div className="dashboard-boxes">
          <div
            className="box"
            onClick={() => handleBoxClick("/inventory-management")}
          >
            <h3>Inventory Management</h3>
          </div>
          <div
            className="box"
            onClick={() => handleBoxClick("/sales-tracking")}
          >
            <h3>Sales Tracking</h3>
          </div>
          <div
            className="box"
            onClick={() => handleBoxClick("/bulk-order-management")}
          >
            <h3>Bulk Order Management</h3>
          </div>
          <div
            className="box"
            onClick={() => handleBoxClick("/festive-pack-management")}
          >
            <h3>Festive Pack Management</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
