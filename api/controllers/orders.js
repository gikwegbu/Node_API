const Order = require('../models/order');
const Product = require('../models/products')

exports.Get_All_Orders = (req, res, next) => {
    Order.find()
    .select("_id quantity product ") 
    .populate('product',' _id name price')/* The first params, would be the table you wish to link, i.e the ref used in the ordermodel, then others are just the format needed to display */
    .exec()
    .then(result => {
        if (result) {
            const doc = {
                count: result.length,
                orders: result.map( order => {
                    return{
                        _Id: order._id,
                        quantity: order.quantity,
                        product: order.product,
                        request: {
                            type: "Get",
                            url: `http://localhost:1997/order/${order._id}`
                        }
                    }
                })
            }
            res.status(200).json({
                Status: 'Success', 
                orders: doc,
            }); 
        }else{
            res.status(404).json({
                Status: 'Failed', 
                orders: "Not Found",
            }); 

        }
         
    })
    .catch(err => {

        res.status(500).json({
            status: "Failed",
            message: err,
        });
    })
};

exports.Post_order = (req, res, next) => {
    const order = new Order({
        _id: Mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId

    });
    order.save()  
    .then(response => {
            res.status(201).json({
            message: 'Order Successfully Created!',
            orderDetails: response
         });
    })
    .catch(err => {
        res.status(500).json({
            message: err
        });
    })
   
};

exports.Get_Single_order = (req, res, next) => {
    const id = req.params.id
    Order.findById(id)
    .select('_id quantity productId')
    .populate('product',' _id name price')   
    .exec()
    .then(result => {
        if(!result){
            res.status(404).json({
                status: 'Failed',
                message: "Order does not exist."
            });
        }else{

            res.status(200).json({
                status: "Success",
                order: result,
                request: {
                    type: "Get",
                    url: `http://localhost:1997/orders/`
                }
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: "Failed",
            message: err
        });
    }) 
};

exports.Patch_Single_order = (req, res, next) =>{
    const id = req.params.id;
    const data = { quantity: req.body.quantity }
    Order.updateOne( {_id: id}, {data}, {upsert: true} )
    .exec()
    .then(response => {

        res.status(200).json({
            message: response
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err
        });

    })
};

exports.Delete_Single_order = (req, res, next) => {
    const id = req.params.id
    Order.remove({_id: id})
    .exec()
    .then( result => {
        res.status(200).json({
            status: "Success",
            message: `The order with ID ${id}, has been Deleted.`
        });
    })
    .catch(err => {
        res.status(500).json({
            status: "Failed",
            message: err
        });
    }) 
}