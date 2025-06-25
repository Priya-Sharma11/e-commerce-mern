const express = require('express');
const router = express.Router();
const {categoryController} = require('../controllers/index')

router.get('/getCategories',categoryController.getAllCategories);
router.get('/categories/subcategories',categoryController.getSubCategories)
router.post('/addCategory',categoryController.addCategory);
router.patch('/updateCategory/:id',categoryController.updateCategory);
router.delete('/deleteCategory/:id',categoryController.deleteCategory);

module.exports = router;