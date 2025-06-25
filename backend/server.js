const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDb = require('./config/db');
const indexRoute = require('./routes/index');

dotenv.config();
connectDb();

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Api is running..');
})

app.use('/',indexRoute);
console.log('calling indexRoute')

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})