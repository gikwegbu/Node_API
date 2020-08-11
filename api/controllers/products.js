const Product = require('../models/products');

exports.Get_All_products = (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then( result => {
        if (result) {
            // Adding more info to the result fetched
            const doc = { 
                count: result.length,
                products: result.map( product => {
                    return{
                        name: product.name,
                        price: product.price,
                        productImage: product.productImage,
                        _id: product._id,
                        request: {
                            type: "Get",
                            url: `http://localhost:1997/products/${product._id}`
                        }
                    }
                })
            }
            res.status(200).json({
                status: 'Success',
                products: doc
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
};

exports.Post_product =  (req, res, next) => {  
    const product = new Product({ 
        _id: new mongoose.Types.ObjectId(), /* constructor function */
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    // save() is a method, provided by mongoose for saving models in the db
    product.save()
    .then(result => {
        res.status(201).json({
            status: 'Successs',
            message: 'Product Successfully Created!',
            createdProduct: {
                name: result.name,
                price: result.price,
                productImage: result.productImage,
                _id: result._id,
                request: {
                    type: "Post",
                    url: `http://localhost:1997/products/${result._id}`
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    })
    
};

exports.Get_Single_product = (req, res, next) => {
    const id = req.params.id
    // Using the already instanciated Product class
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then( doc => {
        if(doc){ 
            const product = {
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                request: {
                    type: 'Get',
                    url: `http://localhost:1997/products/${doc._id}`
                }
            }
            res.status(200).json({
                status: 'Success', 
                message: 'Hey, congrats chief, you just found the Product',
                doc: product
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
};

exports.Patch_Single_product = ( req, res, next) => {
    res.status(200).json({
        message: `Product have been updated successfully`,
        id: req.params.id
    });
};

exports.Delete_Single_product = (req, res, next) => {
    const id = req.params.id
    Product.remove({_id: id})
    .exec()
    .then( result => {
        res.status(200).json({
            status: "Success",
            message: `The Product with ID ${id}, has been Deleted.`
        });
    })
    .catch(err => {
        res.status(500).json({
            status: "Failed",
            message: err
        });
    })
}