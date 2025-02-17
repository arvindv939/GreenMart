import { useState } from "react";

function BulkOrderManagementPage() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Organic Apples",
      quantity: 200,
      price: "500",
      status: "Pending",
    },
    {
      id: 2,
      productName: "Brown Rice",
      quantity: 100,
      price: "300",
      status: "Completed",
    },
    {
      id: 3,
      productName: "Avocados",
      quantity: 150,
      price: "450",
      status: "Pending",
    },
  ]);

  const addBulkOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      productName: "New Product",
      quantity: 100,
      price: "250",
      status: "Pending",
    };
    setOrders([...orders, newOrder]);
  };

  return (
    <div>
      <h1>Bulk Order Management</h1>
      <p>
        Manage bulk orders here. You can add, update, or remove bulk orders.
      </p>

      {/* Button to add a new bulk order */}
      <button onClick={addBulkOrder} className="btn-add-order">
        Add Bulk Order
      </button>

      {/* Orders Table */}
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BulkOrderManagementPage;
