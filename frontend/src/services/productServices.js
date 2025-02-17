import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (productData) => {
  // Removed image handling here as it's part of formData now
  const response = await axios.post(API_URL, productData, {
    headers: { "Content-Type": "multipart/form-data" }, // Keep multipart/form-data here
  });
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const formData = new FormData();
  Object.keys(productData).forEach((key) => {
    formData.append(key, productData[key]);
  });

  const response = await axios.put(`${API_URL}/${productId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
