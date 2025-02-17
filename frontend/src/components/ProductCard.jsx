import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newQuantity, setNewQuantity] = useState(product.quantity);
  
  const imageUrl = product.image || "https://via.placeholder.com/150";

  const handleEdit = () => {
    setEditMode(true);
    setNewPrice(product.price);
    setNewQuantity(product.quantity);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/products/${product._id}`, {
        price: newPrice,
        quantity: newQuantity,
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${product._id}`);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <p className="quantity">Available: {product.quantity} {product.measurement}</p>
        <p className="description">{product.description}</p>
      </div>
      <div className="product-actions">
        {editMode ? (
          <>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
