const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // linking to the products model, to get that particular product's id, 
    // the ref, means i am referencing the Product model
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1} /* In a case the user does not enter the order quantity, i set initial value to 1 */
})

module.exports = mongoose.model('Order', orderSchema)