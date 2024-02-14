const express = require('express');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/product/add", productController.addProduct);
router.post("/product/update", productController.updateProduct);
router.post("/product/delete", productController.deleteProduct);

router.get('/user/register', userController.registerUser);
router.post('/user/login', userController.loginUser);

module.exports = router;
