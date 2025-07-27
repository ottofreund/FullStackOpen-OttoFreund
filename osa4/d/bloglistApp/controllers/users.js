const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/', async (request, response) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        return response.status(400).json({error: 'password must be at least 3 characters long'})
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: hashedPassword
    })

    const created = await newUser.save()
    response.status(201).json(created)
})

router.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('blogs')
    response.json(users)
})

module.exports = router