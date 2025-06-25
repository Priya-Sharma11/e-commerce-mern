const {productModel,categoryModel} = require('../models/index');


const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate('category'); 

    res.status(200).json({
      message: 'Products fetched successfully',
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};


const addProducts = async(req,res)=>{
  try{
    const {title,description,price,image,subCategory} = req.body;

    const category = await categoryModel.findOne({subCategory});
    if(!category){
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const product = new productModel({title,description,price,image,category:category._id});

    await product.save();

    res.status(201).json({message:'Product saved successfully',product});
  }catch(error){
    console.error('Error adding product:', error.message);
    res.status(500).json({ message: 'Failed to Add product' });
 
  }
}
const getProductsBySubCategory = async(req,res)=>{
    try{
        const {subCategory} = req.query;
        if(!subCategory){
          return res.status(400).json({message:"Subcategory is required"});

        }
        const category = await categoryModel.findOne({subCategory});
        if(!category){
          return res.status(404).json({ message: 'No category found with that subCategory' });
        }
        const products = await productModel.find({category:category._id}).populate('category');
        return res.status(200).json({
          message: 'Products fetched successfully',
          products
        });
    }catch(error){
      console.error('Error fetching products by subcategory:', error.message);
      res.status(500).json({ error: error.message });

    }
}

module.exports = {getAllProducts,addProducts,getProductsBySubCategory};