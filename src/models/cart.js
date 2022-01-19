const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    customer: 'default',
    products: [{ product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, quantity: { type: 'number' } }]

})

module.exports = mongoose.model('Cart', cartSchema)