import { useState } from "react";
import PropTypes from "prop-types";

const ProductCard = ({ product, handleUpdateProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    price: product.price,
    quantity: product.quantity,
    measurement: product.measurement || "kg", // Default to kg if undefined
  });

  const measurementUnits = ["kg", "g", "L", "ml", "units", "dozen"];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await handleUpdateProduct(product._id, editedProduct);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="product-card">
      <img
        src={
          product.image
            ? `http://localhost:5000/uploads/${product.image}`
            : product.imageUrl || "/placeholder-image.jpg"
        }
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = "/placeholder-image.jpg";
          e.target.onerror = null; // Prevent infinite loop if the placeholder fails
        }}
      />
      <h4>{product.name}</h4>
      <p>Category: {product.category}</p>

      <div className="product-details">
        <p>
          Price: ₹
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
              min="0"
            />
          ) : (
            product.price
          )}
        </p>
        <p>
          Quantity:
          {isEditing ? (
            <input
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleChange}
              min="0"
            />
          ) : (
            product.quantity
          )}
        </p>
        <p>
          Measurement Unit:
          {isEditing ? (
            <select
              name="measurement"
              value={editedProduct.measurement}
              onChange={handleChange}
            >
              {measurementUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          ) : (
            product.measurement || "kg" // Default display value
          )}
        </p>
      </div>

      <div className="product-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleUpdateProduct: PropTypes.func.isRequired,
};

export default ProductCard;
