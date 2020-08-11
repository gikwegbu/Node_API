const express = require('express');
const router = express.Router(); 
const Mongoose  = require('mongoose');
const checkAuth = require('../auth/check-auth')

// const Order = require('../models/order'); 

// Controllers
const OrderController = require('../controllers/orders')

router.get('/', checkAuth, OrderController.Get_All_Orders); 
router.post('/', checkAuth, OrderController.Post_order); 
router.get('/:id', checkAuth, OrderController.Get_Single_order ); 
router.patch('/:id', checkAuth, OrderController.Patch_Single_order ) 
router.delete('/:id', checkAuth, OrderController.Delete_Single_order);



module.exports = router