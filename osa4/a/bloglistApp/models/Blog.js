const config = require('../utils/config')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

mongoose.connect(url)
    .then(result => console.log(`Connected to ${url}`))

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
