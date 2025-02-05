// InventoryManagementPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagementPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        withCredentials: true,
      });
      setProducts(response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Add new product
  const addProduct = async () => {
    const newProduct = { name, description, price, category, quantity, unit };
    try {
      await axios.post("http://localhost:5000/api/products", newProduct, {
        withCredentials: true,
      });
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Update product
  const updateProduct = async (id) => {
    const updatedProduct = { price, quantity, unit };
    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        updatedProduct,
        { withCredentials: true }
      );
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Delete product (optional)
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        withCredentials: true,
      });
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Inventory Management</h2>
      <div>
        <h3>Add Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unit (kg, g, etc.)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>
              Quantity: {product.quantity} {product.unit}
            </p>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Update Price"
            />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Update Quantity"
            />
            <input
              type="text"
              value={product.unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Update Unit"
            />
            <button onClick={() => updateProduct(product._id)}>Update</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagementPage;
