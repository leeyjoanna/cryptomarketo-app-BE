import mongoose from 'mongoose'

const coinSchema = new mongoose.Schema({
    coin_id: String,
    url_id: String,
    notes: String
})

module.exports = mongoose.model('Coin', coinSchema)