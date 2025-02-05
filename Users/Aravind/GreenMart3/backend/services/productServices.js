// services/productService.js
const Product = require("../models/Product");

const addProduct = async (productData, image) => {
  const newProduct = new Product({
    ...productData,
    image: image ? `/uploads/${image.filename}` : null,
  });
  return await newProduct.save();
};

const getProductsByShopOwner = async (shopOwnerId) => {
  return await Product.find({ shopOwner: shopOwnerId }).populate(
    "shopOwner",
    "name"
  );
};

const updateProduct = async (productId, updatedData, image) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  Object.assign(product, updatedData);
  if (image) product.image = `/uploads/${image.filename}`;
  return await product.save();
};

module.exports = { addProduct, getProductsByShopOwner, updateProduct };
