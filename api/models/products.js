const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true}, /* This is used to add extra check to the values */
    productImage: { type: String, required: true}
})

module.exports = mongoose.model('Product', productSchema)