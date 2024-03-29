const express = require('express');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const { adminLogin, createAdmin } = require('../controllers/adminController');

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/product/add", productController.addProduct);
router.post("/product/update", productController.updateProduct);
router.post("/product/delete", productController.deleteProduct);

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.loginUser);


router.post('/addtocart', userController.addtocart)
router.post('/get/cart', userController.getCart);

router.post('/admin/login', adminLogin);
router.post('/admin/register', createAdmin);



module.exports = router;
