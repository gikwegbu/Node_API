const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then( result => {
        if (result) {
            res.status(200).json({
                status: 'Success',
                products: result
            });
        }else{
            res.status(404).json({
                status: 'Failed',
                message: 'Could not fet data at this time.'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    }) 
});


router.post('/', (req, res, next) => { 
    const product = new Product({ 
        _id: new mongoose.Types.ObjectId(), /* constructor function */
        name: req.body.name,
        price: req.body.price
    });
    // save() is a method, provided by mongoose for saving models in the db
    product.save()
    .then(result => {
        res.status(201).json({
            status: 'Successs',
            message: 'Product Successfully Created!',
            createdProduct: result
        });
    })
    .catch(err => {
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    })
    
});


router.get('/:id', (req, res, next) => {
    const id = req.params.id
    // Using the already instanciated Product class
    Product.findById(id)
    .exec()
    .then( doc => {
        if(doc){ 
            res.status(200).json({
                status: 'Success', 
                message: 'Hey, congrats chief, you just found the Product',
                doc: doc
            });
        }else{
            res.status(404).json({
                status: 'Failed',
                message: "No valid entry found for the provided ID"
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    })  
});

router.patch('/:id', ( req, res, next) => {
    res.status(200).json({
        message: `Product have been updated successfully`,
        id: req.params.id
    });
})


router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Product Deleted successfully',
        id: req.params.id
    });
});



module.exports = router 