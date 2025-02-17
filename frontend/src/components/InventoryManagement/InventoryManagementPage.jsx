import { useState, useEffect } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
} from "../../services/productServices.js"; // Corrected import path
import ProductCard from "./ProductCard.jsx";
import "../../styles/InventoryPage.css"; // Import the CSS file

const InventoryManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    measurement: "kg",
    image: null,
    imageUrl: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Vegetables",
    "Dairy",
    "Fruits",
    "Grains",
    "Meat",
    "Beverages",
    "Snacks",
    "Other",
  ];

  const measurementUnits = ["kg", "g", "L", "ml", "units", "dozen"];

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products);
    } catch (error) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewProduct((prev) => ({
        ...prev,
        image: files[0], // Save the file
        imageUrl: "", // Clear imageUrl when file is selected
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.quantity
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("quantity", newProduct.quantity);
    formData.append("measurement", newProduct.measurement);

    if (newProduct.image) {
      formData.append("image", newProduct.image); // Append image file if available
    } else if (newProduct.imageUrl) {
      formData.append("imageUrl", newProduct.imageUrl); // Append image URL if no file
    }

    try {
      const addedProduct = await addProduct(formData); // Pass FormData to addProduct service
      setProducts([...products, addedProduct]); // Update only the new product, avoid full re-fetch
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        measurement: "kg",
        image: null,
        imageUrl: "",
      });
    } catch (error) {
      setError("Failed to add product");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      setError("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="inventory-container">
      {/* Left Side: Product Entry Form */}
      <div className="product-form-container">
        <h2>Add New Product</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name *"
            value={newProduct.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category *</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="input-group">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity *"
              value={newProduct.quantity}
              onChange={handleChange}
              required
            />
            <select
              name="measurement"
              value={newProduct.measurement}
              onChange={handleChange}
            >
              {measurementUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            name="price"
            placeholder="Price (₹) *"
            value={newProduct.price}
            onChange={handleChange}
            required
          />

          <div className="image-upload">
            <p>Upload an image or enter a URL</p>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            <p>OR</p>
            <input
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              value={newProduct.imageUrl}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* Right Side: Product List */}
      <div className="product-list">
        <h2>Product List</h2>
        {loading && <p>Loading products...</p>}

        {!loading && (!products || products.length === 0) && (
          <p>No products available</p>
        )}

        <div className="grid-container">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleUpdateProduct={handleUpdateProduct}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagementPage;
