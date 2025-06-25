const express = require('express');
const router = express.Router();

const {productController} = require('../controllers/index');

router.get('/getProducts',productController.getAllProducts);
router.post('/addProduct',productController.addProducts);
router.get('/products/by-subcategory',productController.getProductsBySubCategory);

module.exports=router;