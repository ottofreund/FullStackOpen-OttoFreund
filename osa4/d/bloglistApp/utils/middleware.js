const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('./config')

const errorHandler = (err, request, response, next) => {
    if (err.name === 'ValidationError') {
        return response.status(400).json({error: err.message})
    } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({error: err.message})
    } else if (err.name === 'JsonWebTokenError') {
        return response.status(401).json({error: err.message})
    } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({error: 'token expired'})
  }

    next(err)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')
    if (!auth || !auth.startsWith('Bearer ')) {
        next()
        return null
    }
    request.token = auth.replace('Bearer ', '')

    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    //token extractor runs before this so if there is token then request.token is truthy
    if (!token) {
        next()
        return 
    }
    //verify and decode token
    const decoded = jwt.verify(token, config.SECRET)
    const userDoc = await User.findOne({_id: decoded.id})
    request.user = userDoc
    next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}