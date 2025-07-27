const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
        }
    ]
})

usersSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id
        delete returnedObj.passwordHash
        delete returnedObj._id
        delete returnedObj.__v
    }
})

const User = mongoose.model('User', usersSchema)

module.exports = User