import { useState } from "react";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newQuantity, setNewQuantity] = useState(product.quantity);

  const handleEdit = () => {
    setEditMode(true);
    setNewPrice(product.price);
    setNewQuantity(product.quantity);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/products/${product._id}`, {
        price: newPrice,
        quantity: newQuantity,
      });
      setProducts((prev) =>
        prev.map((prod) =>
          prod._id === product._id ? response.data.product : prod
        )
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${product._id}`);
      setProducts((prev) => prev.filter((prod) => prod._id !== product._id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return <div>{/* Render your product card content here */}</div>;
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
