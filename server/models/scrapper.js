const mongoose = require('mongoose')
const	paginate = require('mongoose-paginate-v2')

const { Schema } = mongoose

const urlsSchema = new Schema({
  baseUrl: { type: String, required: true, unique: true },
  urls: [
    { type: String, required: true },
  ],
})

urlsSchema.plugin(paginate)
const Urls = mongoose.model('Url', urlsSchema)

module.exports = Urls
