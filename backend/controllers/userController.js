const {userModel} = require('../models/index');

const register = async(req,res)=>{
  try{
    console.log('getting credentials from req body for register user');
    const {name,email,password} = req.body;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User already exists with this email"});
    }

    const user = new userModel({name,email,password});
    console.log('saving user in db');
    await user.save();
    console.log('saved successfully');
    res.status(201).json({ message: 'User registered successfully', user });
  }catch(error){
    console.log('Error in saving user ',error.message);
    res.status(500).json({ message: 'Server error, please try again later' });

  }
}

const login = async(req,res)=>{
  
  try
  {const {email,password} = req.body;
  console.log('Email from request:', email);

  console.log('Finding user with email:', email);
  const savedUser = await userModel.findOne({ email });
  console.log('Result:', savedUser);

  if(!savedUser){
    console.log('wrong credentials');
    return res.status(401).json({message:"Invalid email or password"});
  }
  // @ts-ignore
  const matchPassword = await savedUser.matchPassword(password);
  if (!matchPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  console.log("Password from DB:", savedUser.password);
console.log("Password from req:", password);

  console.log("Login successfully");
  return res.status(200).json({message:"Login Successfully",user:savedUser});
}catch (err) {
  console.error('Login error:', err);
  return res.status(500).json({ message: 'Internal server error' });
}
}

module.exports = {register,login};