import { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <strong>{product.name}</strong> - ${product.price} | Available:{" "}
            {product.quantity}
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
