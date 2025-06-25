var express = require('express');
const router = express.Router();

const userRoute = require('./userRoutes');
const productRoute = require('./productRoute');
const categoryRoute = require('./categoryRoute')

router.use('/user',userRoute);
router.use('/product',productRoute);
router.use('/category',categoryRoute);

module.exports = router;