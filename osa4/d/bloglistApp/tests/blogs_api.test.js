const supertest = require('supertest')
const app = require('../app')
const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    //reset db before each test to only have the initBlogs
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initBlogs)
})

test('blogs are fetched correctly', async () => {
    const fetchedBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(fetchedBlogs.body.length, 2)
})

test('identifying field is called id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
})

test('a new blog is posted correctly', async () => {
    const blogsBefore = (await api.get('/api/blogs')).body
    const newBlog = {
    "title": "Bruhbruh",
    "author": "Marcus Brownlee",
    "url": "https://fakeassurl3.com",
    "likes": 40,
    "id": "687b7830bc9d254c9de44d54"
  }
    //post new
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = (await api.get('/api/blogs')).body
    //check length increased by 1 and new is found
    assert(blogsAfter.map(blog => blog.title).includes("Bruhbruh"))
    assert.strictEqual(blogsAfter.length - 1, blogsBefore.length)
})

test('a blog is deleted', async () => {
    const blogsBefore = await helper.getBlogs()
    const blogToDelete = blogsBefore[0]
    //delete
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    //check there is one less and deleted id isn't contained
    const blogsAfter = await helper.getBlogs()
    assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
    assert(!blogsAfter.map(b => b.id).includes(blogToDelete.id))
})

test('idempotent behaviour when trying to delete non-existing blog', async () => {
    const blogsBefore = await helper.getBlogs()
    //delete
    await api
        .delete(`/api/blogs/f7642c05b07541e73d90c219`) //not existing id
        .expect(204)
    //check there is one less and deleted id isn't contained
    const blogsAfter = await helper.getBlogs()
    assert.strictEqual(blogsAfter.length, blogsBefore.length)
})

test('updating a blog should work', async () => {
    const updates = {likes: 152005}
    const idToUpdate = ((await helper.getBlogs())[0]).id
    await api
        .put(`/api/blogs/${idToUpdate}`)
        .send(updates)
        .expect(204)
    //check that new likes match
    const updatedDoc = await Blog.findById(idToUpdate)
    assert(updatedDoc.likes === 152005)
})

after(async () => {
    await mongoose.connection.close()
})