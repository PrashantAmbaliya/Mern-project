const ProductModel = require('../models/ProductModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        if (!products) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    const { name, description, basePrice } = req.body;
    try {
        await ProductModel.create({ name, description, basePrice });
        const products = await ProductModel.find({});
        if (!products) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json({ message: "New product is created", products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id, name, description, basePrice } = req.body;
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            { _id: id },
            { $set: { name, description, basePrice } },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(400).json({ message: "Product not found" });
        }
        const products = await ProductModel.find({});
        if (!products) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json({
            products,
            updatedProduct,
            message: "Product is updated"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.body;
    const {email} = req.email
    try {
        if(email == undefined){
            return res.status(400).json({ message: "Somthing is Wrong" });
        }
        const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id });
        if (!deletedProduct) {
            return res.status(400).json({ message: "Product not found" });
        }
        const products = await ProductModel.find({});
        if (!products) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json({
            products,
            message: "Product is deleted"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
