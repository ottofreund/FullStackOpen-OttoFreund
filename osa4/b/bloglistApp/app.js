require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs', blogsRouter)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

module.exports = app