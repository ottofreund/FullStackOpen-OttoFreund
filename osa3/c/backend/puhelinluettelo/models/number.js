require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => console.log("Connected to", url))
    .catch(e => console.log("Failed to connect to db", e.message))

const numberSchema = new mongoose.Schema({
    name: String,
    number: String
})

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
})

const Number = mongoose.model('Number', numberSchema)

module.exports = Number