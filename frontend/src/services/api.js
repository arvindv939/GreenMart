// services/api.js
import axios from "axios";

const API_URL = "/api/products";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (productData, image) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("category", productData.category);
  formData.append("quantity", productData.quantity);
  if (image) formData.append("image", image);

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (productId, productData, image) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("category", productData.category);
  formData.append("quantity", productData.quantity);
  if (image) formData.append("image", image);

  const response = await axios.put(`${API_URL}/${productId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
