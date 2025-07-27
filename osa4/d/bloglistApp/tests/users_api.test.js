const supertest = require('supertest')
const { test, beforeEach } =  require('node:test')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'patrick', password: 'secret' })
    await user.save()
})

test('username and password must exist', async () => {
    const users = [
        { username: 'bob' },
        { password: 'marley' },
        {}
    ]

    const promises = users.map(u => api.post('/api/users').send(u).expect(400))

    const allDone = await Promise.all(promises)

    allDone.forEach(response => assert(
            response.body.error.includes('password must be at least 3 characters long')
            || response.body.error.includes('username: Path `username` is required')
        ))
})

test('username and password must be at least 3 characters long', async () => {
    const users = [
        { username: 'ab', password: 'validpass' },
        { username: 'validuser', password: '12' }
    ]

    const promises = users.map(u => api.post('/api/users').send(u).expect(400))

    const allDone = await Promise.all(promises)

    allDone.forEach(response => assert(
            response.body.error.includes('password must be at least 3 characters long')
            || response.body.error.includes('shorter than the minimum allowed length')
        ))
})

test('username must be unique', async () => {
    const user = { username: 'patrick', password: 'anotherpass' }

    const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)

    assert(response.body.error.includes('duplicate key error'))
})