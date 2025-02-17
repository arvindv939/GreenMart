import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import ProductsPage from "./components/Products/ProductsPage";
import InventoryManagementPage from "./components/InventoryManagement/InventoryManagementPage";
import BulkOrderManagementPage from "./components/BulkOrderManagement/BulkOrderManagementPage";
import FestivePackManagementPage from "./components/FestivePackManagement/FestivePackManagementPage";
import SalesTrackingPage from "./components/SalesTracking/SalesTrackingPage";

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
        {/* Route for bulk order management */}
        <Route
          path="/bulk-order-management"
          element={<BulkOrderManagementPage />}
        />
        {/* Route for festive pack management */}
        <Route
          path="/festive-pack-management"
          element={<FestivePackManagementPage />}
        />
        {/* Route for sales tracking */}
        <Route path="/sales-tracking" element={<SalesTrackingPage />} />
        {/* Default route to the login page */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
