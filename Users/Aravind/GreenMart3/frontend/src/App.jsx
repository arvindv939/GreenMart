// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import ProductsPage from "./components/Products/ProductsPage";
import InventoryManagementPage from "./components/InventoryManagement/InventoryManagementPage"; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Route for registration */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Route for dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Route for products */}
        <Route path="/products" element={<ProductsPage />} />
        {/* Route for inventory management */}
        <Route
          path="/inventory-management"
          element={<InventoryManagementPage />}
        />
        {/* Default route to the login page */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
