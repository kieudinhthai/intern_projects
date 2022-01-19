const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: { type: 'number', required: true },
    image: { type: 'string', required: true },
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    price: { type: 'number', required: true },
    color: { type: 'string', required: true },
    added: { type: 'boolean'}
})

module.exports = mongoose.model('Product', productSchema)