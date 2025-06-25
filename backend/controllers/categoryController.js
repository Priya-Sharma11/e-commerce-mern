const {categoryModel} = require('../models/index');

const addCategory=async(req,res)=>{
  try{
    const {mainCategory,subCategory} = req.body;

    const category = new categoryModel({mainCategory,subCategory});
    await category.save();
    return res.status(200).json({message:'Category saved successfully'});
  }catch(error){
    console.log('error saving category',error.message);
    res.status(500).json({message:'internal server error'});
  }
}

const getAllCategories = async(req,res)=>{

  try{
    console.log('get catgeory')
    const categories = await categoryModel.find();
    console.log('getting all categories');
    res.status(200).json({
      message: 'Fetching all categories',
      categories: categories
    });
    }catch(error){
    console.log('error fetching all categories',error.message);
    res.status(500).json({message:'internal server error'});
  }
}

const getSubCategories = async(req,res)=>{
  try{
    console.log('taking main catgeory from req query');
    
    const {mainCategory} = req.query;
    if(!mainCategory){
      console.log('main cat not found');
      return res.status(400).json({ message: "mainCategory is required" });
    }

    console.log('finding sub cat from model');

    const subCategories = await categoryModel.find({mainCategory}).select('subCategory -_id');

    if(!subCategories.length){
      return res.status(404).json({ message: "No subcategories found" });
    }

    console.log('sub category fetch successfully',subCategories);
    
    const subCategoriesList = subCategories.map(cat=>cat.subCategory);
    console.log('sub category fetch successfully',subCategoriesList);

    
    return res.status(200).json({
      message: 'fetching subcategories',
      subCategories: subCategoriesList
    });
    }catch(error){
    res.status(500).json({ error: error.message });
  }
}

const updateCategory= async(req,res)=>{
  try{
    const {id} = req.params;
  const {mainCategory,subCategory} = req.body;
  console.log('getting updating fields from req body');

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    {mainCategory,subCategory},
    {new:true}
  );
  if(!updatedCategory){
    console.log('catgeory not found');
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({message:'category updated successfully'},updatedCategory);
  console.log('updated successfully');

  }
  catch(error){
    res.status(500).json({ message: "Server error", error: error.message });

  }
}

const deleteCategory = async(req,res)=>{
  try{
  const id = req.params;
  const deletedCategory = await categoryModel.findByIdAndDelete(id);
  res.status(200).json({message:'category deleted successfully'},deletedCategory);
  console.log('category deleted successfully');
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}
module.exports = {addCategory,getAllCategories,updateCategory,deleteCategory,getSubCategories};