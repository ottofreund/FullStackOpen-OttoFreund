const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

router.post('/', async (request, response) => {
    const body = request.body
    if (!body.password || !body.username) {
        return response.status(401).json({error: "provide username and password"})
    }
    const userDoc = await User.findOne({username: body.username})
    const passwordCorrect = !userDoc 
        ? false
        : await bcrypt.compare(body.password, userDoc.passwordHash)
    if (!passwordCorrect) {
        return response.status(401).json({error: 'invalid credentials'})
    }
    //grant token
    const tokenPayload = {
        username: body.username,
        id: userDoc._id
    }
    const token = jwt.sign(tokenPayload, config.SECRET, {
        expiresIn: 60 * 60
    })

    response.status(200)
        .send({token, username: userDoc.username, name: userDoc.name})
})

module.exports = router