const productModel = require("../models/productModel");
const cloudinary = require("../config/cloudinary").cloudinary;






const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { name, description, price, category,  } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      imageUrl = result.secure_url;
    }

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      imagesUrls: imageUrl ? [imageUrl] : [],
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;    
      const product = await productModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
        // Update imagesUrls if provided    

            

            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "products",
                    use_filename: true,
                });
                console.log("Cloudinary upload result:", result);
                // ensure imagesUrls is an array and append the new url
                product.imagesUrls = Array.isArray(product.imagesUrls) ? product.imagesUrls.concat(result.secure_url) : [result.secure_url];
            }

            const updatedProduct = await product.save();
            return res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };

