const Product = require("../models/Product");

const addProduct = async (productData, image) => {
  try {
    if (!productData.name || !productData.price || !productData.quantity) {
      throw new Error("Missing required fields: name, price, or quantity");
    }

    const newProduct = new Product({
      ...productData,
      imageURL: image ? `/uploads/${image.filename}` : null, // Corrected image path
    });

    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error(`Error adding product: ${error.message}`); // Corrected string interpolation
  }
};

const getProductsByShopOwner = async (shopOwnerId) => {
  try {
    return await Product.find({ shopOwner: shopOwnerId }).populate(
      "shopOwner",
      "name"
    );
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`); // Corrected string interpolation
  }
};

const updateProduct = async (productId, updatedData, image) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Update the product fields
    Object.assign(product, updatedData);

    // Update the image path if a new image is provided
    if (image) product.imageURL = `/uploads/${image.filename}`;

    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`); // Corrected string interpolation
  }
};

module.exports = { addProduct, getProductsByShopOwner, updateProduct };
