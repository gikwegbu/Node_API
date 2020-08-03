const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling all GET requests for Order'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        id: req.body.id,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order Successfully Created!',
        orderDetails: order
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).json({
        message: `Order with ID of ${id} has been fetched`,
        id: id
    });
});

router.patch('/:id', (req, res, next) =>{
    const id = req.params.id
    res.status(200).json({
        message: `Your order with ID ${id} have been Updated`
    });
})


router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    res.status(200).json({
        message: `Your Order with ID ${id} has been deleted.`,
        id: id
    });
});



module.exports = router