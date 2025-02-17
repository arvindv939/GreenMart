import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/SalesTrackingPage.css";

const SalesTrackingPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sales")
      .then((response) => setSales(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  return (
    <div className="sales-tracking-container">
      <h2>Sales Tracking</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity Sold</th>
            <th>Total Revenue</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>${sale.revenue}</td>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTrackingPage;
