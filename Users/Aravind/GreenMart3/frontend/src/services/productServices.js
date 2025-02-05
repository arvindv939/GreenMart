import axios from "axios";

const API_URL = "/api/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update product"
    );
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};
